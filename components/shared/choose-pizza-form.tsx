"use client";
import { cn } from "@/lib/utils";
import ProductImage from "./productImage";
import { Title } from "./title";
import { Button } from "../ui/button";
import GroupVariants from "./groupVariants";
import { mapType, pizzaTypes, PizzaSize, PizzaType } from "./pizza-constant";
import { Ingredient, ProductItem } from "@prisma/client";
import IngredientComponent from "./ingredient-component";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import calcPizzaPrices from "@/lib/calc-pizza-prices";
import { usePizzaOptions } from "@/hooks/use-pizza-options";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
  loading: boolean;
}

export default function ChoosePizzaForm({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  onSubmit,
  loading,
}: Props) {
  const {
    size,
    type,
    selectedIngredients,
    availableSizes,
    setSize,
    setType,
    addIngredient,
    currentItemId,
  } = usePizzaOptions(items);

  const textDetails = `${size} см, ${mapType[type]} пицца`;

  const totalPrice = calcPizzaPrices({
    items,
    ingredients,
    selectedIngredients,
    size,
    type,
  });

  const handleClick = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };
  return (
    <div className={cn(className, "flex flex-1")}>
      <ProductImage src={imageUrl} alt={name} size={size} />

      <div className="w-[490px] rounded-xl bg-[#efeeee] p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />
        <p className="text-gray-400">{textDetails}</p>
        <GroupVariants
          items={availableSizes}
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
          loading={loading}
          onClick={handleClick}
          className="mt-10 h-[55px] w-full rounded-[18px] border px-10 text-base"
        >
          Добавить в корзину за {totalPrice} рублей
        </Button>
      </div>
    </div>
  );
}
