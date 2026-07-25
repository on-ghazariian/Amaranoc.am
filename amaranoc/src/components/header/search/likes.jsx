import React from 'react';
import { useFavoritesStore } from '../../../store/useFavoritesStore';
import HomeCard from './../../main/homes/homeCard';

export default function Likes() {
  const likedHomes = useFavoritesStore((state) => state.likedHomes);

  return (
    <div className="w-full px-4 py-5 sm:px-6 md:px-10 lg:pl-12">
      <h2 className="mb-6 text-lg sm:text-xl md:text-2xl font-bold text-[#0f172a] flex items-center">
        <a className="pr-4 transition-transform duration-200 hover:-translate-x-1" href="/">
          <i className="fa-solid fa-arrow-left"/>
        </a>
        <span>Իմ նախընտրած ամառանոցները</span>
      </h2>
      
      {likedHomes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center">
          <i className="fa-regular fa-heart mb-4 text-4xl sm:text-5xl text-gray-300"/>
          <p className="text-sm sm:text-base text-gray-500">Ձեր նախընտրածների ցուցակը դատարկ է։</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {likedHomes.map((home) => (
            <HomeCard key={home.id} home={home} index={home.id} />
          ))}
        </div>
      )}
    </div>
  );
}