"use client";
import { Dialog, DialogContent } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { cn } from "../../lib/utils";
import { IProduct } from "@/@types/product";
import { ProductForm } from "../shared/product-form";

interface Props {
  product: IProduct;
  className?: string;
}

export default function ChooseProductModule({ className, product }: Props) {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "min-h-[500px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0 md:rounded-xl",
          className,
        )}
      >
        <ProductForm
          product={product}
          closeModalAfterSubmit={() => router.back()}
        />
      </DialogContent>
    </Dialog>
  );
}
