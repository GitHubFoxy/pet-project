"use client";
import React, { useEffect } from "react";
import { Title } from "./title";
import { Input } from "../ui/input";
import { RangeSlider } from "../ui/range-slider";
import CheckboxFiltersGroup from "./CheckboxFiltersGroup";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useSet } from "react-use";
import qs from "qs";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};
type PriceProps = {
  priceFrom?: number;
  priceTo?: number;
};

export const Filters: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  const [prices, setPrice] = React.useState<PriceProps>({});

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value,
    });
  };

  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients();

  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
  const [pizzaType, { toggle: togglePizzaType }] = useSet(new Set<string>([]));

  const items = ingredients.map((ingredient) => ({
    value: String(ingredient.id),
    text: ingredient.name,
  }));

  const filters = {
    ...prices,
    pizzaType: Array.from(pizzaType),
    sizes: Array.from(sizes),
    ingredients: Array.from(selectedIds),
  };

  useEffect(() => {
    const queryString = qs.stringify(filters, {
      arrayFormat: "comma",
    });
    router.push(`?${queryString}`);
  }, [filters]);

  return (
    <div className="">
      <Title text="Фильтры" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        name="types"
        className="mb-5"
        title="Тесто"
        onClickCheckbox={togglePizzaType}
        selectedIds={pizzaType}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        name="sizes"
        className="mb-5"
        title="Размеры"
        onClickCheckbox={toggleSizes}
        selectedIds={sizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-300 py-6 pb-7">
        <p className="mb-3 font-bold">Price range</p>
        <div className="mb-5 flex gap-3">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(prices.priceFrom)}
            className="rounded-xl placeholder:text-gray-400"
            onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            min={1}
            max={10000}
            placeholder="1000"
            value={String(prices.priceTo)}
            className="rounded-xl placeholder:text-gray-400"
            onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={5}
          className="bg-gray-200"
          value={[prices.priceFrom || 0, prices.priceTo || 1000]}
          onValueChange={([from, to]) =>
            setPrice({ priceFrom: from, priceTo: to })
          }
        />
      </div>
      <div>
        <CheckboxFiltersGroup
          title="Ингредиенты"
          name="ingredients"
          limit={4}
          defaultItems={items.slice(0, 4)}
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
