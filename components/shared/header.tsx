import React from "react";
import Image from "next/image";
import { ArrowRight, Pizza, ShoppingCart, User } from "lucide-react";
import Container from "./container";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { SearchInput } from "./search-input";
import CartButton from "./cart-button";

type Props = {
  className?: string;
};

const Header: React.FC<Props> = (className: Props) => {
  return (
    <>
      <header className={cn("border-b", className)}>
        <Container className="flex items-center justify-between py-8">
          <Link href="/">
            <div className="flex items-center gap-4">
              <Pizza size={32} />
              <div className="">
                <h1 className="text-center">PET PROJECT</h1>
                <p className="text-center opacity-50">NextJS</p>
              </div>
            </div>
          </Link>

          <div className="mx-10 flex-1">
            <SearchInput />
          </div>

          <div className="flex items-center gap-2">
            <Button className="hover flex gap-2 rounded border">
              <User /> Войти
            </Button>

            <CartButton />
          </div>
        </Container>
      </header>
    </>
  );
};
export default Header;
