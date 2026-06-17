import React from 'react';

export default function ZexchCard({ offer }) {
  return (
    <div className="group relative w-full aspect-[1.53/1] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)] cursor-pointer">
      
      <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
        <img 
          src={offer.imgUrl} 
          alt={offer.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/35" />
      </div>

      <div className="relative z-10 w-full h-full p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col justify-end text-white">
        
        <div className="absolute top-3 sm:top-4 left-4 sm:left-5 font-black tracking-tighter text-[42px] xs:text-[52px] sm:text-[60px] md:text-[68px] lg:text-[72px] leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
          {offer.discount}
        </div>

        <div className="flex flex-col gap-1 sm:gap-1.5 max-w-[98%] mt-auto">
          <h3 className="font-bold text-xs xs:text-sm sm:text-base md:text-lg text-white leading-snug tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
            {offer.title}
          </h3>
          <p className="text-[10px] xs:text-[11px] sm:text-xs md:text-[13px] font-normal text-gray-200/90 leading-normal line-clamp-2 md:line-clamp-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
            {offer.description}
          </p>
        </div>

      </div>
    </div>
  );
}