import React from 'react';
import { useFavoritesStore } from '../../../store/useFavoritesStore';
import HomeCard from './../../main/homes/homeCard';

export default function Likes() {
  const likedHomes = useFavoritesStore((state) => state.likedHomes);

  return (
    <div className="w-full p-5 pl-12">
      <h2 className="mb-6  text-xl font-bold text-[#0f172a]"><a className='pr-5' href="/"><i class="fa-solid fa-arrow-left"></i></a>Իմ նախընտրած ամառանոցները</h2>
      
      {likedHomes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <i className="fa-regular fa-heart mb-4 text-5xl text-gray-300"></i>
          <p className="text-base text-gray-500">Ձեր նախընտրածների ցուցակը դատարկ է։</p>
        </div>
      ) : (
        /* Նույն գրիդի դասավորությունը ինչ գլխավոր էջում */
        <div className="grid gap-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {likedHomes.map((home) => (
            <HomeCard key={home.id} home={home} index={home.id} />
          ))}
        </div>
      )}
    </div>
  );
}