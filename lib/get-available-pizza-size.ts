import { Variant } from "@/components/shared/groupVariants";
import { pizzaSizes, PizzaType } from "@/components/shared/pizza-constant";
import { ProductItem } from "@prisma/client";

interface Props {
  items: ProductItem[];
  type: PizzaType;
}

export default function getAvailablePizzaSize({type, items}: Props): Variant[] {
  const filteredPizzasByType = items.filter((item) => item.pizzaType == type);
  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) == Number(item.value),
    ),
  }));
} 