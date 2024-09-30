import {
  mapType,
  PizzaSize,
  PizzaType,
  pizzaTypes,
} from "@/components/shared/pizza-constant";
import { CartStateItem } from "./get-cart-details";

export default function getCartItemsDetails(
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: CartStateItem["ingredients"],
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
