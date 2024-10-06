"use client";
import { cn } from "@/lib/utils";
import { Title } from "./title";
import { useState } from "react";
import { Button } from "../ui/button";

interface Props {
  imageUrl: string;
  name: string;
  items?: any;
  price: number;
  onClickAdd: VoidFunction;
  className?: string;
}

export default function ChooseProductForm({
  className,
  imageUrl,
  name,
  items,
  price,
  onClickAdd,
}: Props) {
  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="realtive flex w-full flex-1 items-center justify-center">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 z-10 h-[350px] w-[350px] transition-all duration-300"
        />
      </div>
      <div className="flex w-[490px] flex-col justify-between rounded-xl bg-[#efeeee] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />
        <Button
          onClick={onClickAdd}
          className="mt-10 h-[55px] w-full rounded-[18px] border px-10 text-base"
        >
          Добавить в корзину за {price} рублей
        </Button>
      </div>
    </div>
  );
}
