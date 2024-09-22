"use client";
import { Product } from "@prisma/client";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
  className?: string;
}

export default function ChooseProductModule({ className, product }: Props) {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        aria-describedby="xd"
        className="min-h-[500px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0"
      >
        <DialogTitle>Выберите товар</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
