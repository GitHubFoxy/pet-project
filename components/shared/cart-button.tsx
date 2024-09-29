import { User, ShoppingCart, ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import CartDrawer from "./cart-drawer";

export default function CartButton() {
  return (
    <CartDrawer>
      <Button className="group relative rounded-sm border">
        <b>520 P</b>
        <span className="mx-3 h-full w-[1px] bg-black/30"></span>
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} strokeWidth={2} />
          <b>3</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        />
      </Button>
    </CartDrawer>
  );
}
