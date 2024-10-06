"use client";
import { ShoppingCart, ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import CartDrawer from "./cart-drawer";
import { cartState } from "@/store/cart";
import { cn } from "@/lib/utils";

export default function CartButton() {
  const [total, loading, items] = cartState((state) => [
    state.totalAmount,
    state.loading,
    state.items,
  ]);

  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn(
          "group relative rounded-sm border",
          loading && "w-[105px]",
        )}
      >
        <b>{total} ₽</b>
        <span className="mx-3 h-full w-[1px] bg-black/30"></span>
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        />
      </Button>
    </CartDrawer>
  );
}
