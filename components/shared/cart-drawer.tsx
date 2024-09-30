"use client";
import { ArrowRight } from "lucide-react";
import {
  Sheet,
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
import { getCartDetails } from "@/lib/get-cart-details";
import { Api } from "@/services/api-client";

export default function CartDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [totalAmount, items, fetchCartItems] = cartState((state) => [
    state.totalAmount,
    state.items,
    state.fetchCartItems,
  ]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between bg-[#F4F1EE] pb-0">
        <SheetHeader className={cn("flex-row gap-2")}>
          <SheetDescription>
            {" "}
            В корзине <span className="font-bold">{items.length} товара</span>
          </SheetDescription>
          <SheetTitle></SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 flex-1 overflow-auto">
          <div className="mb-2">
            {items.map((i) => (
              <CartDrawerItem
                key={i.id}
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
              />
            ))}
          </div>
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
      </SheetContent>
    </Sheet>
  );
}
