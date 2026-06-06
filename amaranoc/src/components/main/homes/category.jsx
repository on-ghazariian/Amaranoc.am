import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMap, faCalendarAlt, faChevronLeft, faChevronRight,
  faHome, faCampground, faSwimmingPool, faTree, faMountain, faFire, faWater
} from '@fortawesome/free-solid-svg-icons';

import 'swiper/css';
import 'swiper/css/navigation';

export default function CategorySlider() {
  const categories = [
    { id: 1, label: 'Ամառանոցներ', icon: faHome },
    { id: 2, label: 'Frame houses', icon: faCampground },
    { id: 3, label: 'Տնակներ', icon: faHome },
    { id: 4, label: 'Փակ լողավազան', icon: faSwimmingPool },
    { id: 5, label: 'Աղմուկից հեռու', icon: faTree },
    { id: 6, label: 'Շքեղ տեսարան', icon: faMountain },
    { id: 7, label: 'Պահանջված', icon: faFire },
    { id: 8, label: 'Լիճ', icon: faWater },
  ];

  return (
    <div className="w-full select-none bg-white">
      {/* Գործողությունների Կոճակներ */}
      <div className="mb-4 flex gap-3">
        <button className="flex cursor-pointer items-center gap-2 rounded-[30px] border border-black bg-white px-[22px] py-2 text-sm font-semibold text-black">
          <span>Քարտեզ</span>
          <FontAwesomeIcon icon={faMap} />
        </button>
        <button className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full border border-[#cbd5e1] bg-white text-[#475569]">
          <FontAwesomeIcon icon={faCalendarAlt} />
        </button>
      </div>

      <hr className="m-0 border-0 border-t border-[#f1f5f9]" />

      {/* Սլայդեր Վրապպեր */}
      <div className="relative my-3 flex items-center px-9">
        {/* Ձախ կոճակ */}
        <button 
          id="cat-prev" 
          className="absolute left-0 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#cbd5e1] bg-white text-[10px] text-[#475569] shadow-[0_2px_4px_rgba(0,0,0,0.06)] [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-0"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: '#cat-prev', nextEl: '#cat-next' }}
          spaceBetween={28}
          slidesPerView="auto"
          className="w-full"
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.id} style={{ width: 'auto' }}>
              <div className="group flex cursor-pointer flex-col items-center gap-2 border-b-2 border-transparent pb-2 text-[#64748b] transition-all duration-200 hover:border-black hover:text-black">
                <FontAwesomeIcon icon={cat.icon} className="text-15xl" />
                <span className="text-[12px] font-medium whitespace-nowrap">{cat.label}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Աջ կոճակ */}
        <button 
          id="cat-next" 
          className="absolute right-0 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#cbd5e1] bg-white text-[10px] text-[#475569] shadow-[0_2px_4px_rgba(0,0,0,0.06)] [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-0"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      
      <hr className="m-0 border-0 border-t border-[#f1f5f9]" />
    </div>
  );
}   