"use client";
import { cn } from "@/lib/utils";

type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  className?: string;
  items: readonly Variant[];

  onClick?: (value: Variant["value"]) => void;
  selectedValue: Variant["value"];
}

export default function GroupVariants({
  className,
  items,
  onClick,
  selectedValue,
}: Props) {
  return (
    <div
      className={cn(
        className,
        "mt-2 flex select-none justify-between rounded-3xl bg-[#F3F3F7] p-2",
      )}
    >
      {items.map(({ name, value, disabled }) => (
        <button
          key={name}
          className={cn(
            "duration-400 flex h-[30px] flex-1 cursor-pointer items-center justify-center rounded-3xl py-5 text-sm transition-all",
            {
              "bg-white py-5 shadow": value === selectedValue,
              "text-grey-500 pointer-events-none opacity-50": disabled,
            },
          )}
          onClick={() => onClick?.(value)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
