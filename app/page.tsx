import Container from "@/components/shared/container";
import { Filters } from "@/components/shared/filters";
import { Title } from "@/components/shared/title";
import Topbar from "@/components/shared/Topbar";

export default function Home() {
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

          <div className="flex-1"></div>
        </div>
      </Container>
    </>
  );
}
