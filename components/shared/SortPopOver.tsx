import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";

type Props = {
  className?: string;
};

export const SortPopOver: React.FC<Props> = (className) => {
  return (
    <div
      className={cn(
        "group inline-flex h-[60px] cursor-pointer items-center gap-1 rounded-2xl bg-gray-50 px-5",
        className,
      )}
    >
      <ArrowUpDown size={20} />
      <b
        className={cn(
          "text-zinc-500 transition group-hover:text-zinc-800",
          className,
        )}
      >
        Сортировать
      </b>
    </div>
  );
};
