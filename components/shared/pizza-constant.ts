const mapSize = {
  20: "Мини",
  30: "Обычная",
  40: "Большая",
} as const ;

const mapType = {
  1: "Традиционное",
  2: "Тонкое"
} as const;

export const pizzaSizes = Object.entries(mapSize).map(([value, name]) => ({
 name,
 value
}));

export const pizzaTypes = Object.entries(mapType).map(([value, name]) => ({
  name,
  value
 }));

export type PizzaSize = keyof typeof mapSize;
export type PizzaType = keyof typeof mapType;