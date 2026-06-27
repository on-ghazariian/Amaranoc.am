import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { faMapMarkerAlt, faUsers, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Navigation, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '../../../store/useFavoritesStore';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HomeCard({ home, index }) {
  const { likedHomes, toggleFavorite } = useFavoritesStore();
  const navigate = useNavigate();
  
  const isLiked = likedHomes.some(item => item.id === home.id);

  const handleCardClick = () => {
    navigate(`/home/${home.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group/card flex h-auto min-h-[340px] sm:min-h-[370px] flex-col overflow-hidden rounded-xl border border-[#f1f5f9] bg-white shadow-[0_4px_20px_-3px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.12)] cursor-pointer"
    >
      
      <div className="relative aspect-[1.35/1] w-full overflow-hidden h-[200px] sm:h-[220px] md:h-[240px] lg:h-[250px]">
        <button 
          onClick={(e) => e.stopPropagation()}
          className={`card-nav-btn prev-${index} absolute left-2.5 top-1/2 z-10 hidden md:flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[9px] border-none opacity-0 transition-opacity duration-200 md:group-hover/card:opacity-100 [&.swiper-button-disabled]:!hidden`}
        >
          ❮
        </button>
        <button 
          onClick={(e) => e.stopPropagation()}
          className={`card-nav-btn next-${index} absolute right-2.5 top-1/2 z-10 hidden md:flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[9px] border-none opacity-0 transition-opacity duration-200 md:group-hover/card:opacity-100 [&.swiper-button-disabled]:!hidden`}
        >
          ❯
        </button>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(home);
          }}
          className={`absolute right-3 top-3 z-10 border-none bg-none text-base sm:text-lg cursor-pointer drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] transition-colors ${
            isLiked ? 'text-[#ef4444]' : 'text-white/70 hover:text-[#ef4444]'
          }`}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: `.prev-${index}`,
            nextEl: `.next-${index}`,
          }}
          pagination={{ clickable: true }}
          onClick={(swiper, e) => e.stopPropagation()}
          className="h-full w-full [&_.swiper-pagination-bullet]:!bg-white [&_.swiper-pagination-bullet]:!w-1.5 [&_.swiper-pagination-bullet]:!h-1.5 [&_.swiper-pagination-bullet]:!opacity-50 [&_.swiper-pagination-bullet-active]:!opacity-100"
        >
          {home.images.map((imgUrl, imgIdx) => (
            <SwiperSlide key={imgIdx}>
              <img src={imgUrl} alt="property" className="h-full w-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-grow">
        <div className="mb-2 flex flex-wrap gap-x-3 gap-y-1.5">
          <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-[13px] font-medium text-[#334155]">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#f97316] shrink-0" />
            <span className="truncate max-w-[140px] xs:max-w-none">{home.addres}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-[13px] font-medium text-[#334155]">
            <FontAwesomeIcon icon={faUsers} className="text-[#f97316] shrink-0" />
            <span>{home.peopleCount} հոգի</span>
          </div>
        </div>
        <div className="text-sm sm:text-base font-bold text-[#0f172a] mt-2">
          {home.price} <span className="text-xs sm:text-sm font-normal">֏</span>
        </div>
      </div>

    </div>
  );
}