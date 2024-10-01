"use client";
import { cn } from "@/lib/utils";
import { CartItemDetailsImage } from "./cart-item-details/cart-item-details-image";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CartItemInfo } from "./cart-item-details/cart-item-info";
import { CountButton } from "./count-button";
import { CartItemDetailsPrice } from "./cart-item-details/cart-item-details-price";
import { Trash2Icon } from "lucide-react";

interface Props extends CartItemProps {
  onClick?: (type: "plus" | "minus") => void;
  className?: string;
  onClickDelete: VoidFunction;
}

export default function CartDrawerItem({
  className,
  imageUrl,
  name,
  details,
  quantity,
  price,
  onClick,
  onClickDelete,
}: Props) {
  return (
    <div className={cn(className, "flex gap-6 bg-white p-5")}>
      <CartItemDetailsImage src={imageUrl} />
      <div className="flex-1">
        <CartItemInfo name={name} details={details} />
        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <CountButton onClick={onClick} value={quantity} />
          <div className="flex items-center gap-3">
            <CartItemDetailsPrice value={price} />
            <Trash2Icon
              className="cursor-pointer text-gray-400 hover:text-gray-600"
              size={16}
              onClick={onClickDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
