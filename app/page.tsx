import Container from "@/components/shared/container";
import { Filters } from "@/components/shared/filters";
import ProductsGroup from "@/components/shared/products-group";
import { Title } from "@/components/shared/title";
import Topbar from "@/components/shared/Topbar";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        },
      },
    },
  });
  console.log(categories);

  return (
    <>
      <Container className="mt-5">
        <Title text="Все суши" size="lg" className="font-extrabold" />
      </Container>
      <Topbar />

      <Container className="mt-5 pb-14">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroup
                categoryId={1}
                products={[
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                ]}
                title="Суши"
              />
              <ProductsGroup
                categoryId={2}
                products={[
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                ]}
                title="Роллы"
              />
              <ProductsGroup
                categoryId={3}
                products={[
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                  {
                    id: 1,
                    name: "Сашими",
                    image:
                      "https://media.dodostatic.net/image/r:584x584/11EE796FA8B9B8E3828E5FDBDEF24A39.avif",
                    items: [
                      {
                        price: 550,
                      },
                    ],
                  },
                ]}
                title="Сеты"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
