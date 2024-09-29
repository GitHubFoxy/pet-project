import { PizzaSize, PizzaType } from "@/components/shared/pizza-constant";
import { Ingredient, ProductItem } from "@prisma/client";

interface Props {
    items: ProductItem[];
    ingredients: Ingredient[];
    selectedIngredients: Set<number>;
    size: PizzaSize;
    type: PizzaType;
}

export default function calcPizzaPrices({items, ingredients, selectedIngredients, size, type}: Props) { 
    const PizzaPrice =
      items.find((item) => item.size == size && item.pizzaType == type)?.price ||
      0;
    const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

    return PizzaPrice! + totalIngredientsPrice;
}