"use client";
import { cn } from "@/lib/utils";
import ProductImage from "./productImage";
import { Title } from "./title";
import { useState } from "react";
import { Button } from "../ui/button";
import GroupVariants from "./groupVariants";
import {
  mapType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from "./pizza-constant";
import { Ingredient, ProductItem } from "@prisma/client";
import IngredientComponent from "./ingredient-component";
import { useSet } from "react-use";
import { Pizza } from "lucide-react";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
  className?: string;
}

export default function ChoosePizzaForm({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  onClickAddCart,
}: Props) {
  const [size, setSize] = useState<PizzaSize>(30);
  const [type, setType] = useState<PizzaType>(1);

  const textDetails = `${size} см, ${mapType[type]} пицца`;
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([]),
  );
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const PizzaPrice = items.find(
    (item) => item.size == size && item.pizzaType == type,
  )?.price;

  const totalPrice = PizzaPrice! + totalIngredientsPrice;

  const handleClick = () => {
    // onClickAddCart!();
    console.log({
      size,
      type,
      ingredients: selectedIngredients,
      totalPrice,
    });
  };

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

        <div className="mt-2 h-[420px] overflow-auto rounded-md p-5 scrollbar">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientComponent
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          onClick={handleClick}
          className="mt-10 h-[55px] w-full rounded-[18px] border bg-gray-300 px-10 text-base hover:bg-gray-400"
        >
          Добавить в корзину за {PizzaPrice} рублей
        </Button>
      </div>
    </div>
  );
}
