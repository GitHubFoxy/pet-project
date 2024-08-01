import React from "react";
import { Categories } from "./categories";
import { SortPopOver } from "./SortPopOver";
import { cn } from "@/lib/utils";
import Container from "./container";

type Props = {
  className?: string;
};

const Topbar: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("sticky top-0 z-10 bg-white py-5 shadow-sm", className)}>
      <Container className="flex items-center justify-between">
        <Categories className="mt-5" />
        <SortPopOver className="mt-5" />
      </Container>
    </div>
  );
};

export default Topbar;
