import React from "react";
import Filter from "./filter/filter";
import Home from "./homes/home";

export function Main() {
  return (
    <main className="w-full bg-gray-50/50">
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 md:px-10 md:py-10 lg:px-[70px] flex flex-col xl:flex-row gap-6 md:gap-8 lg:gap-[50px] items-start">
        <Filter />
        <Home />
      </div>
    </main>
  );
}