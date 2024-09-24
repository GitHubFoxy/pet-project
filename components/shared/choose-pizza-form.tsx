"use client";
import { cn } from "@/lib/utils";
import ProductImage from "./productImage";
import { Title } from "./title";
import { useState } from "react";
import { Button } from "../ui/button";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: any;
  items?: any;
  onClickAdd?: VoidFunction;
  className?: string;
}

export default function ChoosePizzaForm({
  className,
  imageUrl,
  name,
  ingredients,
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
      <ProductImage src={imageUrl} size={30} alt="" />
      <div className="w-[490px] rounded-xl bg-[#efeeee] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />
        <p className="text-gray-400">{textDetails}</p>
        <Button className="mt-2 h-[55px] w-full rounded-[18px] border bg-gray-300 px-10 text-base hover:bg-gray-400">
          Добавить в корзину за {totalprice} рублей
        </Button>
      </div>
    </div>
  );
}
