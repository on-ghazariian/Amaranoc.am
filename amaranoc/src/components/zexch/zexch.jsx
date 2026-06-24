import React from 'react';
import ZexchCard from './zexchCard';

export default function Zexch() {
  const offersDb = [
    {
      id: 1,
      discount: '-15%',
      title: 'Զեղչ կախված ամրագրման օրերի քանակից',
      description: 'Ստացիր 5-15% զեղչ կատարելով ամրագրում 3-ից մինչև 20 օր:',
      imgUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 2,
      discount: '-10%',
      title: 'Ամենահայտնի Reel-ը սոցիալական հարթակում',
      description: 'Վիդեո տարբերակով ներկայացրու քո լավագույն օրերից մեկը amaranoc.am ի առանձնատներից մեկում և ստացիր 15% զեղչ:',
      imgUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 3,
      discount: '-5%',
      title: 'Ավելացրու 5% զեղչ քո յուրաքանչյուր 3-րդ այցի համար',
      description: 'Իրականացրու բազմաթիվ ամրագրումներ և յուրաքանչյուր 3-րդ ամրագրման համար ստացիր 5% զեղչ:',
      imgUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  return (
    <div className="w-full bg-white py-10 select-none flex flex-col items-center px-4">
      
      {/* Վերնագրի հատված — Սահմանափակված է 1100px լայնությամբ */}
      <div className="flex items-center justify-between gap-4 mb-10 w-full max-w-[1100px]">
        <div className="hidden sm:block h-px bg-[#e2e8f0] flex-grow" />
        <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] uppercase tracking-wide whitespace-nowrap px-4">
          Հատուկ զեղչեր
        </h2>
        <div className="hidden sm:block h-px bg-[#e2e8f0] flex-grow" />
      </div>

      {/* Քարտերի ցանցը (Grid) — Սահմանափակված է 1100px լայնությամբ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1100px]">
        {offersDb.map((offer) => (
          <ZexchCard key={offer.id} offer={offer} />
        ))}
      </div>

    </div>
  );
}