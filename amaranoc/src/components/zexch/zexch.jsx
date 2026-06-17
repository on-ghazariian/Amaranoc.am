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
    <section className="w-full bg-white py-10 select-none">
      
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="hidden sm:block h-px bg-[#e2e8f0] flex-grow" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f172a] uppercase tracking-wide whitespace-nowrap text-center w-full sm:w-auto px-4">
          Հատուկ զեղչեր
        </h2>
        <div className="hidden sm:block h-px bg-[#e2e8f0] flex-grow" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {offersDb.map((offer) => (
          <ZexchCard key={offer.id} offer={offer} />
        ))}
      </div>

    </section>
  );
}