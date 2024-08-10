"use client";
import React from "react";
import FilterCheckBox, { FilterCheckBoxProps } from "./FilterCheckBox";
import { Input } from "../ui/input";

type Item = FilterCheckBoxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  defaultValue?: string[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (values: string[]) => void;
  className?: string;
}

const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  defaultValue,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  onChange,
  className,
}) => {
  const [showAll, setShowAll] = React.useState(false);

  return (
    <div className={className}>
      <p className="mb-3 font-bold">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            className="border-none bg-gray-50 placeholder:text-black/40"
          />
        </div>
      )}
      <div className="scrollbar scrollbar-thin flex max-h-96 flex-col gap-4 overflow-auto pr-2">
        {items.map((item, idx) => (
          <FilterCheckBox
            key={idx}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            onCheckChange={(idx) => console.log(idx)}
            checked={false}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckboxFiltersGroup;
