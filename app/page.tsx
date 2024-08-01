import { Categories } from "@/components/shared/categories";
import Container from "@/components/shared/container";
import { Title } from "@/components/shared/title";

export default function Home() {
  return (
    <>
      <Container className="mt-5">
        <Title text="Все суши" size="lg" className="font-extrabold" />
        <Categories className="mt-5" />
      </Container>
    </>
  );
}
