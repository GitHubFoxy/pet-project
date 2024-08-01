import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
};

export const Categories: React.FC<Props> = ({ className }) => {
  const categories = ["Все", "Суши", "Сеты", "Роллы", "Напитки", "Десерты"];
  const activeIdx = 0;

  return (
    <div className="flex items-center justify-between">
      <div
        className={cn(
          "inline-flex gap-1 rounded-2xl bg-gray-50 p-2",
          className,
        )}
      >
        {categories.map((category, idx) => {
          return (
            <a
              href={"#" + category}
              key={idx}
              className={cn(
                "flex h-11 items-center rounded-2xl px-5 font-bold text-zinc-500 transition hover:text-zinc-800",
                activeIdx === idx &&
                  "shadow-grey/30 bg-white text-zinc-900 shadow-md",
              )}
            >
              <button>{category}</button>
            </a>
          );
        })}
      </div>
    </div>
  );
};
