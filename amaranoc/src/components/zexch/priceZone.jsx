import React, { useState } from 'react';

export default function PriceZone() {
  const [currency, setCurrency] = useState('AMD');
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(400000);

  const currencies = [
    { id: 'AMD', symbol: '֏' },
    { id: 'USD', symbol: '$' },
    { id: 'EUR', symbol: '€' },
    { id: 'RUB', symbol: '₽' }
  ];

  return (
    <div className="w-full bg-white py-8 select-none font-sans">
      
      {/* Վերնագրի հատված */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="hidden sm:block h-px bg-[#e2e8f0] flex-grow" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f172a] uppercase tracking-wide whitespace-nowrap text-center w-full sm:w-auto px-4">
          Թեժ առաջարկներ
        </h2>
        <div className="hidden sm:block h-px bg-[#e2e8f0] flex-grow" />
      </div>

      {/* Ֆիլտրի հիմնական բլոկ */}
      <div className="w-full border border-[#e2e8f0] rounded-2xl p-4 sm:p-5 md:py-6 md:px-8 flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-8">
        
        {/* Տարադրամի ընտրություն */}
        <div className="flex flex-col gap-2 shrink-0 justify-center">
          <span className="text-xs font-semibold text-[#475569]">Տարադրամ</span>
          <div className="flex items-center gap-2">
            {currencies.map((curr) => (
              <button
                key={curr.id}
                onClick={() => setCurrency(curr.id)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border text-sm font-bold flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  currency === curr.id
                    ? 'bg-[#1e293b] text-white border-[#1e293b]'
                    : 'bg-white text-[#475569] border-[#e2e8f0] hover:bg-gray-50'
                }`}
              >
                {curr.symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Գնային սլայդեր (Range Slider) */}
        <div className="flex-grow flex flex-col justify-end pt-6 md:pt-4">
          <div className="relative w-full flex items-center">
            
            {/* Ձախակողմյան գնի պիտակ */}
            <div 
              className="absolute -top-7 transform -translate-x-1/2 bg-[#f97316] text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-sm flex items-center gap-0.5"
              style={{ left: `${(minValue / 400000) * 100}%` }}
            >
              {minValue.toLocaleString()} <span>֏</span>
            </div>

            {/* Աջակողմյան գնի պիտակ */}
            <div 
              className="absolute -top-7 transform -translate-x-1/2 bg-[#f97316] text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-sm flex items-center gap-0.5"
              style={{ left: `${(maxValue / 400000) * 100}%` }}
            >
              {maxValue.toLocaleString()} <span>֏</span>
            </div>

            {/* Սլայդերի գիծը */}
            <div className="absolute left-0 right-0 h-1 bg-[#f97316] rounded-full" />

            {/* Ձախ բռնակ (Thumb) */}
            <div 
              className="absolute w-4 h-4 rounded-full border-2 border-[#f97316] bg-white shadow-md z-10 -translate-x-1/2"
              style={{ left: `${(minValue / 400000) * 100}%` }}
            />

            {/* Աջ բռնակ (Thumb) */}
            <div 
              className="absolute w-4 h-4 rounded-full border-2 border-[#f97316] bg-white shadow-md z-10 -translate-x-1/2"
              style={{ left: `${(maxValue / 400000) * 100}%` }}
            />

            {/* Իրական HTML Range Input-ներ վերևից կառավարելու համար */}
            <input 
              type="range"
              min="0"
              max="400000"
              value={minValue}
              onChange={(e) => setMinValue(Math.min(Number(e.target.value), maxValue - 10000))}
              className="absolute w-full h-1 opacity-0 pointer-events-auto cursor-pointer z-20"
            />
            <input 
              type="range"
              min="0"
              max="400000"
              value={maxValue}
              onChange={(e) => setMaxValue(Math.max(Number(e.target.value), minValue + 10000))}
              className="absolute w-full h-1 opacity-0 pointer-events-auto cursor-pointer z-20"
            />

          </div>
        </div>

      </div>
    </div>
  );
}