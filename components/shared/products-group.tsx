import React from "react";
import ProductCard from "./ProductCard";
import { Title } from "./title";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  products: any[];
  listClassName?: string;
  categoryId: number;
  className?: string;
};

const ProductsGroup: React.FC<Props> = ({
  className,
  products,
  categoryId,
  listClassName,
  title,
}) => {
  return (
    <div className={className}>
      <Title text={title} size="lg" className="mb-5 font-extrabold" />
      <div className={cn("grid grid-cols-3 gap-[50px]")}>
        {products
          .filter((product) => product.items.length > 0)
          .map((product, idx) => (
            <ProductCard
              key={idx}
              id={product.id}
              name={product.name}
              imageUrl={product.image}
              price={product.items[0].price}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductsGroup;
