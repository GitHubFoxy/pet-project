"use client";
import { cn } from "@/lib/utils";
import ProductImage from "./productImage";
import { Title } from "./title";
import { useState } from "react";
import { Button } from "../ui/button";
import GroupVariants from "./groupVariants";
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "./pizza-constant";
import { Ingredient } from "@prisma/client";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
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
  const [size, setSize] = useState<PizzaSize>(30);
  const [type, setType] = useState<PizzaType>(1);

  const [textDetails, setTextDetails] = useState<string>(
    "30 см, традиционное тесто 30",
  );
  const [totalprice, setTotalprice] = useState<number>(0);

  return (
    <div className={cn(className, "flex flex-1")}>
      <ProductImage src={imageUrl} alt={name} size={size} />

      <div className="w-[490px] rounded-xl bg-[#efeeee] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />
        <p className="text-gray-400">{textDetails}</p>
        <GroupVariants
          items={pizzaSizes}
          selectedValue={String(size)}
          onClick={(value) => setSize(Number(value) as PizzaSize)}
        />
        <GroupVariants
          items={pizzaTypes}
          selectedValue={String(type)}
          onClick={(value) => setType(Number(value) as PizzaType)}
        />
        <Button className="mt-10 h-[55px] w-full rounded-[18px] border bg-gray-300 px-10 text-base hover:bg-gray-400">
          Добавить в корзину за {totalprice} рублей
        </Button>
      </div>
    </div>
  );
}
