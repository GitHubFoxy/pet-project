"use client";
import React, { useState } from "react";
import FilterCheckBox, { FilterCheckBoxProps } from "./FilterCheckBox";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

type Item = FilterCheckBoxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  defaultValue?: string[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  className?: string;
  selectedIds?: Set<string>;
  name?: string;
}

const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  defaultValue,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  onClickCheckbox,
  loading,
  className,
  selectedIds,
  name,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [search, setSearch] = useState("");

  if (loading) {
    return (
      <div className={className}>
        <p className="mb-3 font-bold">{title}</p>
        {...Array(limit)
          .fill(0)
          .map((_, idx) => (
            <Skeleton key={idx} className="mb-4 h-6 rounded-lg bg-black/10" />
          ))}
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(search.toLowerCase()),
      )
    : (defaultItems || items).slice(0, limit);

  return (
    <div className={className}>
      <p className="mb-3 font-bold">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchInputPlaceholder}
            className="border-none bg-gray-50 placeholder:text-black/40"
          />
        </div>
      )}
      <div className="flex max-h-48 flex-col gap-4 overflow-auto pr-2 scrollbar-thin">
        {list.map((item, idx) => (
          <FilterCheckBox
            key={idx}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            onCheckChange={() => onClickCheckbox?.(item.value)}
            checked={selectedIds?.has(item.value)}
            name={name}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? "mt-2 pt-2 text-center" : "mt-2 text-center"}>
          <button className="p-2" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Hide" : "+ Show All"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckboxFiltersGroup;
