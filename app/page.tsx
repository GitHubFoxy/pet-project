import Container from "@/components/shared/container";
import { Title } from "@/components/shared/title";
import Topbar from "@/components/shared/Topbar";

export default function Home() {
  return (
    <>
      <Container className="mt-5">
        <Title text="Все суши" size="lg" className="font-extrabold" />
      </Container>
      <Topbar />
    </>
  );
}
