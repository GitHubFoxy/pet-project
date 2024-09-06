import React from "react";
import Image from "next/image";
import { ArrowRight, Pizza, ShoppingCart, User } from "lucide-react";
import Container from "./container";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { SearchInput } from "./search-input";

type Props = {
  className?: string;
};

const Header: React.FC<Props> = (className: Props) => {
  return (
    <>
      <header className={cn("border-b", className)}>
        <Container className="flex items-center justify-between py-8">
          <Link href='/'>
            <div className="flex items-center gap-4">
              <Pizza size={32} />
              <div className="">
                <h1 className="text-center">PET PROJECT</h1>
                <p className="text-center opacity-50">NextJS</p>
              </div>
            </div>
          </Link>

          <div className="mx-10 flex-1">
            <SearchInput  />
          </div>

          <div className="flex items-center gap-2">
            <Button className="flex gap-2 rounded border hover:bg-neutral-300">
              <User /> Войти
            </Button>
            <div className="group relative">
              <Button className="rounded border hover:bg-neutral-300">
                <b>520 P</b>
                <span className="mx-3 h-full w-[1px] bg-black/30"></span>
                <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                  <ShoppingCart size={16} strokeWidth={2} />
                  <b>3</b>
                </div>
                <ArrowRight
                  size={20}
                  className="absolute right-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </Button>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};
export default Header;
