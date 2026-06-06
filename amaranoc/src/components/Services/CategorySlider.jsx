import React, { useState } from "react";

export default function CategorySlider() {
  const categories = [
    { id: 1, name: "Սպասարկում", icon: "fa-solid fa-bell-concierge" },
    { id: 2, name: "Շոու", icon: "fa-solid fa-wand-magic-sparkles" },
    { id: 3, name: "Միջոցառումներ", icon: "fa-solid fa-cake-candles" },
    { id: 4, name: "Տեխնիկա", icon: "fa-solid fa-rocket" },
    { id: 5, name: "Օրավարձով գույք", icon: "fa-solid fa-sun" },
  ];

  const [activeId, setActiveId] = useState(1);

  return (
    <>
    
    {/* max-w-5xl կամ max-w-6xl-ով սահմանափակում ենք լայնությունը, որ շատ չտարածվի մեծ էկրաններին */}
    <div className="relative flex w-full max-w-5xl mx-auto items-center border-b border-[#f1f5f9] bg-white py-3 pr-10">
      
      {/* Կատեգորիաների բլոկ */}
      <div className="flex w-full items-center justify-between overflow-x-auto scrollbar-none">
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <div
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className="group flex flex-col items-center gap-2 cursor-pointer pb-1.5 text-center select-none min-w-[80px] flex-1"
            >
              {/* Իկոն */}
              <i
                className={`${cat.icon} text-base transition-colors duration-200 ${
                  isActive ? "text-[#1a2530]" : "text-[#475569] group-hover:text-[#1a2530]"
                }`}
              ></i>
              
              {/* Տեքստ */}
              <span
                className={`text-xs font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActive ? "text-[#1a2530]" : "text-[#475569] group-hover:text-[#1a2530]"
                }`}
              >
                {cat.name}
              </span>

              {/* Նարնջագույն գիծ */}
              <div
                className={`h-[2.5px] w-6 rounded-full bg-[#ff8c00] transition-all duration-300 ${
                  isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Աջ կողմի սլաքը */}
      <button className="absolute right-0 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#cbd5e1] bg-white text-[#475569] shadow-sm transition-all hover:bg-slate-50 hover:text-[#1a2530]">
        <i className="fa-solid fa-chevron-right text-[10px]"></i>
      </button>
      
    </div>
    </>
  );
}