"use client";
import { IProduct } from "@/@types/product";
import { cartState } from "@/store/cart";
import toast from "react-hot-toast";
import ChoosePizzaForm from "./choose-pizza-form";
import ChooseProductForm from "./choose-product-form";

interface Props {
  product: IProduct;
  closeModalAfterSubmit?: VoidFunction;
}

export function ProductForm({ product, closeModalAfterSubmit }: Props) {
  const [addCartItem, loading] = cartState((state) => [
    state.addCartItem,
    state.loading,
  ]);
  const firstItem = product.items[0];
  const isPizza = Boolean(firstItem.pizzaType);

  async function onSubmit(productItemId?: number, ingredients?: number[]) {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });
      //   router.back();
      closeModalAfterSubmit?.();
      toast.success(`${product.name} в корзине!`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }
  if (isPizza) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  } else {
    return (
      <ChooseProductForm
        price={firstItem.price}
        onClickAdd={onSubmit}
        imageUrl={product.imageUrl}
        name={product.name}
        loading={loading}
      />
    );
  }
}
