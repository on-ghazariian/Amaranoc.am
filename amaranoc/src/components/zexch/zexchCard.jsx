import React from 'react';

export default function ZexchCard({ offer }) {
  return (
    <div className="group relative w-full aspect-[1.46/1] rounded-3xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] cursor-pointer">
      
      {/* Հետնաֆոնի նկարը և մուգ շերտը */}
      <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-103">
        <img 
          src={offer.imgUrl} 
          alt={offer.title} 
          className="w-full h-full object-cover"
        />
        {/* Մուգ ֆիլտր ճիշտ նկարի երանգով */}
        <div className="absolute inset-0 bg-black/55 transition-opacity duration-300 group-hover:bg-black/60" />
      </div>

      {/* Բովանդակություն */}
      <div className="relative z-10 w-full h-full p-5 sm:p-6 flex flex-col justify-between text-white font-sans">
        
        {/* Զեղչի տոկոսը (Ձգված, հաստ, վերևի ձախ անկյունում) */}
        <div className="font-sans font-black text-[50px] sm:text-[55px] tracking-tighter leading-none select-none">
          {offer.discount}
        </div>

        {/* Տեքստային բլոկ (Ներքևի հատվածում) */}
        <div className="flex flex-col gap-1.5 max-w-[95%]">
          <h3 className="font-bold text-[14px] sm:text-[15px] text-white leading-snug tracking-wide">
            {offer.title}
          </h3>
          <p className="text-[11px] sm:text-[12px] font-normal text-gray-200 leading-relaxed opacity-90">
            {offer.description}
          </p>
        </div>

      </div>
    </div>
  );
}