import React from "react";
import { Title } from "./title";
import FilterCheckBox from "./FilterCheckBox";
import { Input } from "../ui/input";
import { RangeSlider } from "../ui/range-slider";
import CheckboxFiltersGroup from "./CheckboxFiltersGroup";

type Props = {
  className?: string;
};

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className="">
      <Title text="Фильтры" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckBox text="Новинки" value="1" />
        <FilterCheckBox text="Можно собирать" value="2" />
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
          title="Категории"
          limit={4}
          defaultItems={[
            { text: "Суши", value: "1" },
            { text: "Роллы", value: "2" },
            { text: "Сеты", value: "3" },
            { text: "Роллы", value: "4" },
            { text: "Сеты", value: "5" },
            { text: "Роллы", value: "6" },
          ]}
          items={[
            { text: "Суши", value: "1" },
            { text: "Роллы", value: "2" },
            { text: "Сеты", value: "3" },
            { text: "Роллы", value: "4" },
            { text: "Сеты", value: "5" },
            { text: "Роллы", value: "6" },
            { text: "Роллы", value: "2" },
            { text: "Сеты", value: "3" },
            { text: "Роллы", value: "4" },
            { text: "Сеты", value: "5" },
            { text: "Роллы", value: "6" },
            { text: "Роллы", value: "2" },
            { text: "Сеты", value: "3" },
            { text: "Роллы", value: "4" },
            { text: "Сеты", value: "5" },
            { text: "Роллы", value: "6" },
          ]}
          className="mt-5"
        />
      </div>
    </div>
  );
};
