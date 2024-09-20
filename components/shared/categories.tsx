"use client";
import { cn } from "@/lib/utils";
import { useCategoryState } from "@/store/category";
import { Category } from "@prisma/client";

type Props = {
  className?: string;
  items: Category[];
};

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryState((state) => state.activeId);

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (e.target instanceof HTMLAnchorElement) {
      const innerText = e.target.innerText;
      const scrollTarget: HTMLElement | null = document.querySelector(
        `div#${innerText}`,
      );
      if (scrollTarget) {
        const offsetTop = scrollTarget.offsetTop - 140;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div
        className={cn(
          "inline-flex gap-1 rounded-2xl bg-gray-50 p-2",
          className,
        )}
      >
        {items.map(({ name: title, id }, idx) => {
          return (
            <a
              href={`#${title}`}
              key={idx}
              className={cn(
                "flex h-11 items-center rounded-2xl px-5 font-bold text-zinc-500 transition hover:text-zinc-800",
                categoryActiveId === id &&
                  "shadow-grey/30 bg-white text-zinc-900 shadow-md",
              )}
              onClick={handleCategoryClick}
            >
              {title}
            </a>
          );
        })}
      </div>
    </div>
  );
};
