import React from "react";
import { Categories } from "./categories";
import { SortPopOver } from "./SortPopOver";
import { cn } from "@/lib/utils";
import Container from "./container";
import { Category } from "@prisma/client";

type Props = {
  items: Category[];
  className?: string;
};

const Topbar: React.FC<Props> = ({ className, items }) => {
  return (
    <div
      id="topbar"
      className={cn("sticky top-0 z-10 bg-white py-5 shadow-sm", className)}
    >
      <Container className="flex items-center justify-between">
        <Categories className="mt-5" items={items} />
        <SortPopOver className="mt-5" />
      </Container>
    </div>
  );
};

export default Topbar;
