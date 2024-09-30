import { ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CartDrawerItem from "./cart-drawer-item";
import getCartItemsDetails from "@/lib/get-cart-items-details";

export default function CartDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const totalAmount = 3;
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between bg-[#F4F1EE] pb-0">
        <SheetHeader className={cn("flex-row gap-2")}>
          В корзине <span className="font-bold">3 товара</span>
        </SheetHeader>

        <div className="-mx-6 mt-5 flex-1 overflow-auto">
          <div className="mb-2">
            <CartDrawerItem
              details={getCartItemsDetails(1, 20, [
                { name: "Картофель" },
                { name: "Яйцо" },
              ])}
              id={1}
              imageUrl="https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp"
              name="Чоризо фреш"
              price={419}
              quantity={1}
            />
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
