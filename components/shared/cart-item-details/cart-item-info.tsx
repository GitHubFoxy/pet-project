import { cn } from "@/lib/utils";
import { Ingredient } from "@prisma/client";
import { PizzaSize, PizzaType, pizzaTypes } from "../pizza-constant";

interface Props {
  className?: string;
  name: string;
  details: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, className, details }) => {
  return (
    <div>
      <div className={cn("flex items-center justify-between", className)}>
        <h2 className="flex-1 text-lg font-bold leading-6">{name}</h2>
      </div>
      {details && <p className="w-[90%] text-xs text-gray-400">{details}</p>}
    </div>
  );
};
