"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CartDrawerItem from "./cart-drawer-item";
import getCartItemsDetails from "@/lib/get-cart-items-details";
import { cartState } from "@/store/cart";
import { useEffect } from "react";
import { PizzaSize, PizzaType } from "./pizza-constant";
import { Title } from "./title";

export default function CartDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    totalAmount,
    items,
    fetchCartItems,
    updateItemQuantity,
    removeCartItem,
  ] = cartState((state) => [
    state.totalAmount,
    state.items,
    state.fetchCartItems,
    state.updateItemQuantity,
    state.removeCartItem,
  ]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus",
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className={cn(
          "flex flex-col bg-[#F4F1EE] pb-0",
          items.length > 0 ? "justify-between" : "justify-center",
        )}
      >
        <SheetHeader className={cn("flex-row gap-2")}>
          {items.length > 0 && (
            <>
              <SheetDescription>
                {" "}
                В корзине{" "}
                <span className="font-bold">{items.length} товара</span>
              </SheetDescription>
              <SheetTitle></SheetTitle>
            </>
          )}
        </SheetHeader>

        {items.length == 0 && (
          <div className="mx-auto flex w-72 flex-col items-center justify-center">
            <Image
              src={"/images/empty-box.webp"}
              alt=""
              width={200}
              height={200}
            />
            <SheetClose>
              <Title className="mb-4" text={"Тут пусто :("} />
              <Button>
                <ArrowLeft size={18} /> Вернуться назад
              </Button>
            </SheetClose>
          </div>
        )}

        {items.length > 0 && (
          <>
            {" "}
            <div className="-mx-6 mt-5 flex-1 overflow-auto">
              {items.map((i) => (
                <div key={i.id} className="mb-2">
                  <CartDrawerItem
                    details={
                      i.pizzaSize && i.pizzaType
                        ? getCartItemsDetails(
                            i.pizzaType as PizzaType,
                            i.pizzaSize as PizzaSize,
                            i.ingredients,
                          )
                        : ""
                    }
                    id={1}
                    imageUrl={i.imageUrl}
                    name={i.name}
                    price={i.price}
                    quantity={i.quantity}
                    onClick={(type) =>
                      onClickCountButton(i.id, i.quantity, type)
                    }
                    onClickDelete={() => removeCartItem(i.id)}
                    deleting={i.deleting}
                  />
                </div>
              ))}
            </div>
            <SheetFooter className="-mx-6 block bg-white p-8">
              <div>
                <div className="mb-4 flex">
                  <span className="flex flex-1 text-lg text-neutral-400">
                    Итого
                    <div className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200"></div>
                  </span>
                  <span className="text-lg font-bold">{totalAmount} ₽ </span>
                </div>
                <Link href="/cart">
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl text-base duration-300"
                  >
                    Оформить заказ
                    <ArrowRight className="ml-2 w-5" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
