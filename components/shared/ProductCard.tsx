import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
};

const ProductCard: React.FC<Props> = ({
  className,
  imageUrl,
  id,
  name,
  price,
}) => {
  return (
    <div className={cn(className)}>
      <Link
        href={`/product/${id}`}
        className="flex h-full flex-col justify-between gap-2"
      >
        {/* Change images to sharp Images */}
        <div className="flex h-[260px] justify-center rounded-xl bg-neutral-100 p-6">
          <img
            className="aspect-square"
            height={215}
            width={215}
            alt={name}
            src={imageUrl}
          />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">
          Рис, Нори, Лосось, Тунец, Креветки, Угорь, Огурец, Масаго, Васаби,
          Соевый соус
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[20px]">
            от <b>{price} ₽</b>
          </span>
          <Button
            variant={"default"}
            className="hover rounded text-base font-bold"
          >
            <Plus className="mr-1" size={20} />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
