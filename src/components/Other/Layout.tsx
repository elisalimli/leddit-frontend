import React from "react";
import { WrapperProps } from "./Wrapper";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../Navbar/Navbar"));
const Wrapper = dynamic(() => import("./Wrapper"));

export const Layout: React.FC<WrapperProps> = ({ children, mobileFull }) => {
  return (
    <>
      <Navbar />
      <Wrapper mobileFull={mobileFull}>{children}</Wrapper>
    </>
  );
};
