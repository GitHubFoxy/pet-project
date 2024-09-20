import Container from "@/components/shared/container";
import GroupVariants from "@/components/shared/groupVariants";
import ProductImage from "@/components/shared/productImage";
import { Title } from "@/components/shared/title";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  if (!product) {
    return notFound();
  }

  return (
    <Container className="my-10 flex flex-col">
      <div className="flex flex-1">
        <ProductImage src={product.imageUrl} alt={product.name} size={30} />

        <div className="w-[490px] rounded-xl bg-[#efeeee] p-7">
          <Title
            text={product.name}
            size="md"
            className="mb-1 font-extrabold"
          />
          <GroupVariants
            items={[
              { name: "Мини", value: "1" },
              { name: "Обычная", value: "2" },
              { name: "Большая", value: "3" },
            ]}
            selectedValue="2"
          />
        </div>
      </div>
    </Container>
  );
}
