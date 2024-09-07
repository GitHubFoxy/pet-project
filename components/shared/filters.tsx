'use client'
import React from "react";
import { Title } from "./title";
import FilterCheckBox from "./FilterCheckBox";
import { Input } from "../ui/input";
import { RangeSlider } from "../ui/range-slider";
import CheckboxFiltersGroup from "./CheckboxFiltersGroup";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";

type Props = {
  className?: string;
};

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIds} = useFilterIngredients()
  const items = ingredients.map((ingredient) => ({value: String(ingredient.id), text: ingredient.name}))

  return (
    <div className="">
      <Title text="Фильтры" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckBox name="qwe" text="Новинки" value="1" />
        <FilterCheckBox name="asd" text="Можно собирать" value="2" />
      </div>
      <div className="mt-5 border-y border-y-neutral-300 py-6 pb-7">
        <p className="mb-3 font-bold">Price range</p>
        <div className="mb-5 flex gap-3">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            className="rounded-xl placeholder:text-gray-400"
          />
          <Input
            type="number"
            min={1}
            max={10000}
            placeholder="10000"
            className="rounded-xl placeholder:text-gray-400"
          />
        </div>
        <RangeSlider min={0} max={1000} step={5} className="bg-gray-200" />
      </div>
      <div>
        <CheckboxFiltersGroup
          title="Ингредиенты"
          name="ingredients"
          limit={4}
          defaultItems={items.slice(0,4)}
          items={items}
          className="mt-5"
          loading={loading}
          onClickCheckbox={onAddId}
          selectedIds={selectedIds}
        />
      </div>
    </div>
  );
};
