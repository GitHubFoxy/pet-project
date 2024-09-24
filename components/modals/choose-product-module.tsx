"use client";
import { Product } from "@prisma/client";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { cn } from "../../lib/utils";
import ChoosePizzaForm from "../shared/choose-pizza-form";
import { IProduct } from "@/@types/product";
import ChooseProductForm from "../shared/choose-product-form";

interface Props {
  product: IProduct;
  className?: string;
}

export default function ChooseProductModule({ className, product }: Props) {
  const router = useRouter();
  const isPizza = Boolean(product.items[0].pizzaType);

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
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
}
