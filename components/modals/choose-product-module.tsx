"use client";
import { Dialog, DialogContent } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { cn } from "../../lib/utils";
import ChoosePizzaForm from "../shared/choose-pizza-form";
import { IProduct } from "@/@types/product";
import ChooseProductForm from "../shared/choose-product-form";
import { cartState } from "../../store/cart";
import toast from "react-hot-toast";

interface Props {
  product: IProduct;
  className?: string;
}

export default function ChooseProductModule({ className, product }: Props) {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizza = Boolean(firstItem.pizzaType);
  const [addCartItem, loading] = cartState((state) => [
    state.addCartItem,
    state.loading,
  ]);

  async function onSubmit(productItemId?: number, ingredients?: number[]) {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });
      router.back();
      toast.success(`${product.name} в корзине!`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "min-h-[500px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0 md:rounded-xl",
          className,
        )}
      >
        {isPizza ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onSubmit}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            price={firstItem.price}
            onClickAdd={onSubmit}
            imageUrl={product.imageUrl}
            name={product.name}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
