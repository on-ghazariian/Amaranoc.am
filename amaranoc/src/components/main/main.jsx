import React from "react";
import Filter from "./filter/filter";
import Home from "./homes/home";

export function Main() {
  return (
    <>
      <div className="flex flex-col justify-center gap-6 px-4 pt-[50px] md:flex-row md:gap-[50px] lg:px-[100px]">
        <Filter />
        <Home />
      </div>
    </>
  );
}