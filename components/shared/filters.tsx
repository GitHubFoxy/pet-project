import React from "react";
import { Title } from "./title";
import FilterCheckBox from "./FilterCheckBox";
import { Input } from "../ui/input";
import { RangeSlider } from "../ui/range-slider";

type Props = {
  className?: string;
};

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div>
      <Title text="Фильтры" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckBox text="Новинки" value="1" />
        <FilterCheckBox text="Можно собирать" value="2" />
      </div>
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
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
        <RangeSlider min={0} max={10000} step={5} className="bg-gray-200" />
      </div>
    </div>
  );
};
