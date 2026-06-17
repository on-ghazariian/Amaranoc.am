import React from 'react';
import { Link } from 'react-router-dom';
import { useFavoritesStore } from '../../../store/useFavoritesStore';

function Search() {
  const likedHomes = useFavoritesStore((state) => state.likedHomes);
  const favoritesCount = likedHomes.length;

  return (
    <div className="flex items-center justify-end gap-4 sm:gap-5 md:gap-[22px] w-full sm:w-auto">
      <Link to="/likes" className="relative flex items-center justify-center">
        <i className="fa-solid fa-heart cursor-pointer text-base sm:text-[17px] text-[#1a2530] transition-colors hover:text-[#ef4444]"></i>
        {favoritesCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#ef4444] px-1 text-[9px] sm:text-[10px] font-bold text-white animate-bounce">
            {favoritesCount}
          </span>
        )}
      </Link>

      <i className="fa-solid fa-globe cursor-pointer text-[15px] text-[#1a2530]"></i>
      <Link to="/chat">
        <i className="fa-regular fa-user cursor-pointer text-[15px] text-[#1a2530]"></i>
      </Link>
      
      <div className="relative flex items-center w-full max-w-[150px] xs:max-w-[18px] sm:max-w-[220px] md:w-[255px]">
        <input 
          type="text" 
          placeholder="Որոնում" 
          className="w-full rounded-[30px] border border-[#dcdcdc] bg-white py-2 sm:py-[11px] pl-4 sm:pl-5 pr-9 sm:pr-10 text-xs sm:text-sm font-sans text-[#1a2530] outline-none placeholder:text-[#b0b5bc]" 
        />
        <i className="fa-solid fa-magnifying-glass pointer-events-none absolute right-3 sm:right-4 text-sm sm:text-base text-[#1a2530]"></i>
      </div>
    </div>
  );
}

export default Search;