import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { faMapMarkerAlt, faUsers, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Navigation, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFavoritesStore } from '../../../store/useFavoritesStore'; // Ներմուծիր սթորը

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HomeCard({ home, index }) {
  // Վերցնում ենք սթորի տվյալները
  const { likedHomes, toggleFavorite } = useFavoritesStore();
  
  // Ստուգում ենք՝ այս կոնկրետ տունը լայքած է, թե ոչ
  const isLiked = likedHomes.some(item => item.id === home.id);

  return (
    <div className="group/card flex h-[370px] flex-col overflow-hidden rounded-xl border border-[#f1f5f9] bg-white">
      
      {/* Քարտի Սլայդեր */}
      <div className="relative aspect-[1.35/1] w-full overflow-hidden h-[250px]">
        <button className={`card-nav-btn prev-${index} absolute left-2.5 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[9px] border-none opacity-0 transition-opacity duration-200 group-hover/card:opacity-100 [&.swiper-button-disabled]:!hidden`}>
          ❮
        </button>
        <button className={`card-nav-btn next-${index} absolute right-2.5 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[9px] border-none opacity-0 transition-opacity duration-200 group-hover/card:opacity-100 [&.swiper-button-disabled]:!hidden`}>
          ❯
        </button>
        
        {/* Սիրտ (Ֆավորիտ) */}
        <button 
          onClick={() => toggleFavorite(home)} // Կլիկ անելիս ավելացնում կամ ջնջում է
          className={`absolute right-3 top-3 z-10 border-none bg-none text-lg cursor-pointer drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] transition-colors ${
            isLiked ? 'text-[#ef4444]' : 'text-white/70 hover:text-[#ef4444]'
          }`}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>

        {/* Swiper Պատկերներ */}
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: `.prev-${index}`,
            nextEl: `.next-${index}`,
          }}
          pagination={{ clickable: true }}
          className="h-full w-full [&_.swiper-pagination-bullet]:!bg-white [&_.swiper-pagination-bullet]:!w-1.5 [&_.swiper-pagination-bullet]:!h-1.5 [&_.swiper-pagination-bullet]:!opacity-50 [&_.swiper-pagination-bullet-active]:!opacity-100"
        >
          {home.imgs.map((imgUrl, imgIdx) => (
            <SwiperSlide key={imgIdx}>
              <img src={imgUrl} alt="property" className="h-full w-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Ինֆորմացիայի հատված */}
      <div className="p-3.5">
        <div className="mb-2 flex gap-3">
          <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#334155]">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#f97316]" />
            <span>{home.loc}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#334155]">
            <FontAwesomeIcon icon={faUsers} className="text-[#f97316]" />
            <span>{home.person} հոգի</span>
          </div>
        </div>
        <div className="text-base font-bold text-[#0f172a]">
          {home.price} <span className="text-sm font-normal">֏</span>
        </div>
      </div>

    </div>
  );
}