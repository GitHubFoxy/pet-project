import Container from "@/components/shared/container";
import { Filters } from "@/components/shared/filters";
import ProductsGroup from "@/components/shared/products-group";
import { Title } from "@/components/shared/title";
import Topbar from "@/components/shared/Topbar";
import { findPizzas, GetSearchParams } from "@/lib/find-pizzas";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);

  return (
    <div>
      <Container className="mt-5">
        <Title
          text="Лучшая пицца в России"
          size="lg"
          className="font-extrabold"
        />
      </Container>
      <Topbar
        items={categories.filter((category) => category.products.length > 0)}
      />
      <Container className="mt-5 pb-14">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroup
                      key={category.id}
                      categoryId={category.id}
                      title={category.name}
                      products={category.products}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
