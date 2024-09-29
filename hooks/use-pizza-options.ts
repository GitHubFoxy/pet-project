import { Variant } from "@/components/shared/groupVariants";
import { PizzaSize, PizzaType } from "@/components/shared/pizza-constant";
import getAvailablePizzaSize from "@/lib/get-available-pizza-size";
import { ProductItem } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface Props {
    items: ProductItem[];

}

interface ReturnType {
    size: PizzaSize;
    type: PizzaType;
    setSize: (size: PizzaSize) => void;
    setType: (type: PizzaType) => void;
    selectedIngredients: Set<number>;
    addIngredient: (id: number) => void;
    availablePizzaSizes: Variant[];
}

export default function usePizzaOptions({items}: Props): ReturnType {
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([]),
  );
  
  
  const [size, setSize] = useState<PizzaSize>(30);
  const [type, setType] = useState<PizzaType>(1);
  const availablePizzaSizes = getAvailablePizzaSize({type, items});
    useEffect(() => {
        const isAvailableSize = availablePizzaSizes?.find((item) => {
          Number(item.value) === size && !item.disabled;
        });
        const availableSize = availablePizzaSizes?.find((item) => !item.disabled);
    
        if (!isAvailableSize && availableSize) {
          setSize(Number(availableSize.value) as PizzaSize);
        }
      }, [type]);
      return {size, type, setSize, setType, selectedIngredients, addIngredient, availablePizzaSizes};
}