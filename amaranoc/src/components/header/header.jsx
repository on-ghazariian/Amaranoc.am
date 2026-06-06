import React from "react";
import Navigation from "./navItem/navItem";
import Search from "./search/search";

export function Header() {
  return (
    <>
      <div className="mx-4 my-5 flex flex-col items-center justify-between gap-4 sm:mx-10 md:flex-row lg:mx-[70px]">
        <a href="/">
          <img 
            src="https://amaranoc.am/images/logo.svg" 
            alt="logo" 
            className="h-11 w-40" 
          />
        </a>
        <Navigation />
        <Search />
      </div>
    </>
  );
}