import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: VoidFunction;
}

export default function IngredientComponent({
  className,
  imageUrl,
  name,
  price,
  active,
  onClick,
}: Props) {
  return (
    <div
      className={cn(
        className,
        "relative flex w-32 cursor-pointer select-none flex-col items-center justify-between rounded-xl bg-white p-1 text-center shadow-md",
        { "border border-primary": active },
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck className="absolute right-2 top-2 text-primary" />
      )}
      <img
        src={imageUrl}
        alt=""
        width={110}
        height={110}
        className="pointer-events-none select-none rounded-md"
      />
      <div className="flex flex-col items-center">
        <span className="mb-1 text-xs">{name}</span>
        <span className="font-bold">{price} ₽</span>
      </div>
    </div>
  );
}
