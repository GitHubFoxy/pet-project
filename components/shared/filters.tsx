"use client";
import { Title } from "./title";
import { Input } from "../ui/input";
import { RangeSlider } from "../ui/range-slider";
import CheckboxFiltersGroup from "./CheckboxFiltersGroup";
import { useIngredients, useFilters, useQueryFilters } from "@/hooks";

type Props = {
  className?: string;
};

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((ingredient) => ({
    value: String(ingredient.id),
    text: ingredient.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  const resetPrices = () => {
    filters.setPrices("priceFrom", 0);
    filters.setPrices("priceTo", 1000);
  };

  return (
    <div className="">
      <Title text="Фильтры" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        name="types"
        className="mb-5"
        title="Тесто"
        onClickCheckbox={filters.setPizzaTypes}
        selectedIds={filters.pizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        name="sizes"
        className="mb-5"
        title="Размеры"
        onClickCheckbox={filters.setSizes}
        selectedIds={filters.sizes}
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
            value={String(filters.prices.priceFrom)}
            className="rounded-xl placeholder:text-gray-400"
            onChange={(e) =>
              filters.setPrices("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            min={1}
            max={10000}
            placeholder="1000"
            value={String(filters.prices.priceTo)}
            className="rounded-xl placeholder:text-gray-400"
            onChange={(e) =>
              filters.setPrices("priceTo", Number(e.target.value))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <RangeSlider
            min={0}
            max={1000}
            step={5}
            className="bg-gray-200"
            value={[filters.prices.priceFrom, filters.prices.priceTo]}
            onValueChange={updatePrices}
          />
          <div className="flex justify-center rounded py-1 duration-200 hover:bg-gray-200">
            <button className="text-center" onClick={resetPrices}>
              Reset
            </button>
          </div>
        </div>
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
          onClickCheckbox={filters.setSelectedIngredients}
          selectedIds={filters.selectedIngredients}
        />
      </div>
    </div>
  );
};
