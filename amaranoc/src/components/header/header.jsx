import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./navItem/navItem";
import Search from "./search/search";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-[1440px] px-4 py-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4 sm:px-8 lg:px-[70px]">
        
        <div className="flex items-center justify-between w-full xl:w-auto">
          <Link to="/" className="flex-shrink-0">
            <img 
              src="https://amaranoc.am/images/logo.svg" 
              alt="logo" 
              className="h-9 w-32 sm:h-11 sm:w-40 object-contain" 
            />
          </Link>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="flex flex-col justify-center items-center xl:hidden w-8 h-8 gap-1.5 cursor-pointer z-50"
          >
            <span className={`h-0.5 w-6 bg-[#1a2530] transition-all duration-300 rounded ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`h-0.5 w-6 bg-[#1a2530] transition-all duration-300 rounded ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-0.5 w-6 bg-[#1a2530] transition-all duration-300 rounded ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
        
        <div className={`w-full xl:w-auto flex-col xl:flex-row items-center gap-5 xl:flex transition-all duration-300 origin-top ${
          isOpen ? 'flex opacity-100 max-h-[500px] mt-2' : 'hidden xl:flex'
        }`}>
          <div className="w-full xl:w-auto flex justify-center order-2 xl:order-1 py-2 xl:py-0">
            <Navigation />
          </div>
          
          <div className="w-full xl:w-auto flex justify-center xl:justify-end order-1 xl:order-2 pb-2 xl:pb-0 border-b border-gray-100 xl:border-none">
            <Search />
          </div>
        </div>

      </div>
    </header>
  );
}