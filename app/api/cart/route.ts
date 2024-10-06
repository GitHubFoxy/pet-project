import { findOrCreateCart } from "@/lib/find-or-create-cart";
import { updateCartTotalAmount } from "@/lib/server/update-cart-total-amount";
import { prisma } from "@/prisma/prisma-client";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token: token,
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    if (!userCart) {
      return NextResponse.json({ items: [] });
    }

    return NextResponse.json(userCart);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;
    let isNewToken = false;
    if (!token) {
      token = crypto.randomUUID();
      isNewToken = true;
    }

    const userCart = await findOrCreateCart(token);
    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            id: { in: data.ingredients },
          },
          some: {},
        },
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: { id: findCartItem.id },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);
    if (isNewToken) {
      const response = NextResponse.json(updatedUserCart);
      response.cookies.set("cartToken", token);
      return response;
    } else {
      return NextResponse.json(updatedUserCart);
    }
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json(
      { message: "Не удалось создать корзину" },
      { status: 500 },
    );
  }
}
