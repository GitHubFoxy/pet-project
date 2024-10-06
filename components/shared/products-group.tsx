"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { Title } from "./title";
import { cn } from "@/lib/utils";
import { useIntersection } from "react-use";
import { useCategoryState } from "@/store/category";
import { IProduct } from "@/@types/product";

type Props = {
  title: string;
  products: IProduct[];
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
  const setActiveCategoryId = useCategoryState((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.7,
  });

  React.useEffect(() => {
    if (intersection && intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting]);
  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="mb-5 font-extrabold" />
      <div className={cn("grid grid-cols-3 gap-[50px]")}>
        {products
          .filter((product) => product.items.length > 0)
          .map((product, idx) => (
            <ProductCard
              key={idx}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.items[0].price}
              ingredients={product.ingredients}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductsGroup;
