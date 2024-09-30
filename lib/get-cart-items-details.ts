import {
  mapType,
  PizzaSize,
  PizzaType,
  pizzaTypes,
} from "@/components/shared/pizza-constant";
import { Ingredient } from "@prisma/client";

interface Props {
  pizzaType: PizzaType;
  pizzaSize: PizzaSize;
  ingredients: Ingredient[];
}

export default function getCartItemsDetails(
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: Ingredient[],
) {
  const details = [];
  if (pizzaSize && pizzaType) {
    const typeName = mapType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см `);
  }
  if (ingredients) {
    details.push(...ingredients.map((i) => i.name));
  }
  return details.join(", ");
}
