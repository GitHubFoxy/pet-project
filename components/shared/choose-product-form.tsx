"use client";
import { cn } from "@/lib/utils";
import ProductImage from "./productImage";
import { Title } from "./title";
import { useState } from "react";
import { Button } from "../ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Props {
  imageUrl: string;
  name: string;
  items?: any;
  onClickAdd?: VoidFunction;
  className?: string;
}

export default function ChooseProductForm({
  className,
  imageUrl,
  name,
  items,
  onClickAdd,
}: Props) {
  const [textDetails, setTextDetails] = useState<string>(
    "30 см, традиционное тесто 30",
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [totalprice, setTotalprice] = useState<number>(0);

  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="realtive flex w-full flex-1 items-center justify-center">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 z-10 h-[350px] w-[350px] transition-all duration-300"
        />
      </div>
      <div className="w-[490px] rounded-xl bg-[#efeeee] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />
        <p className="text-gray-400">{textDetails}</p>
        <Button className="mt-10 h-[55px] w-full rounded-[18px] border bg-gray-300 px-10 text-base hover:bg-gray-400">
          Добавить в корзину за {totalprice} рублей
        </Button>
      </div>
    </div>
  );
}
