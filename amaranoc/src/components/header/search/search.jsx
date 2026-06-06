import React from 'react';
import { Link } from 'react-router-dom';
import { useFavoritesStore } from '../../../store/useFavoritesStore';

function Search() {
  const likedHomes = useFavoritesStore((state) => state.likedHomes);
  const favoritesCount = likedHomes.length; // Լայքերի քանակը

  return (
    <div className="flex items-center gap-[22px]">
      <Link to="/likes" className="relative flex items-center justify-center">
        <i className="fa-solid fa-heart cursor-pointer text-[17px] text-[#1a2530] transition-colors hover:text-[#ef4444]"></i>
        {favoritesCount > 0 && (
          <span className="absolute -right-2.5 -top-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] font-bold text-white animate-bounce">
            {favoritesCount}
          </span>
        )}
      </Link>

      <i className="fa-solid fa-globe cursor-pointer text-[15px] text-[#1a2530]"></i>
      <i className="fa-regular fa-user cursor-pointer text-[15px] text-[#1a2530]"></i>
      
      <div className="relative flex items-center w-[255px]">
        <input 
          type="text" 
          placeholder="Որոնում" 
          className="w-full rounded-[30px] border border-[#dcdcdc] bg-white py-[11px] pl-5 pr-10 text-0.5xl font-sans text-[#1a2530] outline-none placeholder:text-[#b0b5bc]" 
        />
        <i className="fa-solid fa-magnifying-glass pointer-events-none absolute right-4 text-base text-[#1a2530]"></i>
      </div>
    </div>
  );
}

export default Search;