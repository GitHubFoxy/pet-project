"use client";
import { cn } from "@/lib/utils";
import { useCategoryState } from "@/store/category";
import React from "react";

type Props = {
  className?: string;
};

export const Categories: React.FC<Props> = ({ className }) => {
  const categories = [
    { id: 1, title: "Суши" },
    { id: 2, title: "Роллы" },
    { id: 3, title: "Сеты" },
    { id: 4, title: "Напитки" },
    { id: 5, title: "Десерты" },
  ];

  const categoryActiveId = useCategoryState((state) => state.activeId);

  return (
    <div className="flex items-center justify-between">
      <div
        className={cn(
          "inline-flex gap-1 rounded-2xl bg-gray-50 p-2",
          className,
        )}
      >
        {categories.map(({ title, id }, idx) => {
          return (
            <a
              href={`#${title}`}
              key={idx}
              className={cn(
                "flex h-11 items-center rounded-2xl px-5 font-bold text-zinc-500 transition hover:text-zinc-800",
                categoryActiveId === id &&
                  "shadow-grey/30 bg-white text-zinc-900 shadow-md",
              )}
            >
              <button>{title}</button>
            </a>
          );
        })}
      </div>
    </div>
  );
};
