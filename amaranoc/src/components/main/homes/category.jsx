import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMap, faCalendarAlt, faChevronLeft, faChevronRight,
  faHome, faCampground, faSwimmingPool, faTree, faMountain, faFire, faHotel, faStore
} from '@fortawesome/free-solid-svg-icons';

import 'swiper/css';
import 'swiper/css/navigation';

export default function CategorySlider({ selectedCategory, onCategoryChange }) {
  // Քո տրամադրած DB-ի բոլոր կատեգորիաները իրենց icon-ներով
  const categories = [
    { id: 1, label: 'Ամառանոցներ', key: 'mansion', icon: faHome },
    { id: 2, label: 'Frame houses', key: 'frame houses', icon: faCampground },
    { id: 3, label: 'Տնակներ', key: 'homes', icon: faHome },
    { id: 4, label: 'Փակ լողավազան', key: 'swimming pool', icon: faSwimmingPool },
    { id: 5, label: 'Աղմուկից հեռու', key: 'silent', icon: faTree },
    { id: 6, label: 'Շքեղ տեսարան', key: 'magnificent view', icon: faMountain },
    { id: 7, label: 'Պահանջված', key: 'required', icon: faFire },
    { id: 8, label: 'Հյուրանոցներ', key: 'hotels', icon: faHotel },
  ];

  const handleCategoryClick = (key) => {
    // Եթե նույնի վրա ենք սեղմում, անջատում ենք ֆիլտրը (ցույց է տալիս բոլորը)
    if (selectedCategory === key) {
      onCategoryChange(null);
    } else {
      onCategoryChange(key);
    }
  };

  return (
    <div className="w-full select-none bg-white">
      <div className="mb-4 flex items-center justify-between sm:justify-start gap-3 py-1">
        <button className="flex cursor-pointer items-center justify-center gap-2 rounded-[30px] border border-black bg-white px-4 py-2 sm:px-[22px] text-xs sm:text-sm font-semibold text-black active:bg-gray-50 transition-colors">
          <span>Քարտեզ</span>
          <FontAwesomeIcon icon={faMap} />
        </button>
        <button className="flex h-9 w-9 sm:h-[38px] sm:w-[38px] cursor-pointer items-center justify-center rounded-full border border-[#cbd5e1] bg-white text-[#475569] active:bg-gray-50 transition-colors">
          <FontAwesomeIcon icon={faCalendarAlt} />
        </button>
      </div>

      <hr className="m-0 border-0 border-t border-[#f1f5f9]" />

      <div className="relative my-3 flex items-center px-0 md:px-9">
        <button 
          id="cat-prev" 
          className="absolute left-0 z-10 hidden md:flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#cbd5e1] bg-white text-xs text-[#475569] shadow-[0_2px_4px_rgba(0,0,0,0.06)] [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-0 transition-opacity duration-200"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: '#cat-prev', nextEl: '#cat-next' }}
          spaceBetween={16}
          slidesPerView="auto"
          breakpoints={{
            480: { spaceBetween: 20 },
            768: { spaceBetween: 24 },
            1024: { spaceBetween: 28 }
          }}
          className="w-full"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <SwiperSlide key={cat.id} style={{ width: 'auto' }}>
                <div 
                  onClick={() => handleCategoryClick(cat.key)}
                  className={`group flex cursor-pointer flex-col items-center gap-1.5 sm:gap-2 border-b-2 pb-2 transition-all duration-200 ${
                    isActive 
                      ? 'border-black text-black font-semibold' 
                      : 'border-transparent text-[#64748b] hover:border-black hover:text-black'
                  }`}
                >
                  <FontAwesomeIcon icon={cat.icon} className="text-base sm:text-lg md:text-xl" />
                  <span className="text-[11px] sm:text-[12px] font-medium whitespace-nowrap">{cat.label}</span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button 
          id="cat-next" 
          className="absolute right-0 z-10 hidden md:flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#cbd5e1] bg-white text-xs text-[#475569] shadow-[0_2px_4px_rgba(0,0,0,0.06)] [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-0 transition-opacity duration-200"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      
      <hr className="m-0 border-0 border-t border-[#f1f5f9]" />
    </div>
  );
}