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

  const getCurrencySymbol = () => {
    return currencies.find(c => c.id === currency)?.symbol || '֏';
  };

  return (
    <div className="w-full bg-white py-8 select-none font-sans flex flex-col items-center px-4">
      
      {/* Վերնագրի հատված */}
      <div className="flex items-center justify-between gap-4 mb-10 w-full max-w-[1100px]">
        <div className="hidden sm:block h-px bg-[#e2e8f0] flex-grow" />
        <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] uppercase tracking-wide whitespace-nowrap px-4">
          Թեժ առաջարկներ
        </h2>
        <div className="hidden sm:block h-px bg-[#e2e8f0] flex-grow" />
      </div>

      {/* Ֆիլտրի հիմնական բլոկ (Ավելի մուգ border-ով և շեշտված shadow-ով) */}
      <div className="w-full max-w-[1100px] border border-[#cbd5e1] rounded-2xl bg-white p-5 md:py-5 md:px-8 flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-10 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
        
        {/* Տարադրամի ընտրություն */}
        <div className="flex flex-col gap-2 shrink-0 justify-center">
          <span className="text-[13px] font-medium text-[#475569] pl-0.5">Տարադրամ</span>
          <div className="flex items-center gap-2">
            {currencies.map((curr) => (
              <button
                key={curr.id}
                onClick={() => setCurrency(curr.id)}
                className={`w-9 h-9 rounded-full border text-sm font-semibold flex items-center justify-center transition-all duration-150 cursor-pointer ${
                  currency === curr.id
                    ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-sm'
                    : 'bg-white text-[#475569] border-[#cbd5e1] hover:border-gray-400'
                }`}
              >
                {curr.symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Գնային սլայդեր (Range Slider) */}
        <div className="flex-grow flex flex-col justify-end pt-5 md:pt-3">
          <div className="relative w-full flex items-center h-2">
            
            {/* Ակտիվ նարնջագույն բարակ գիծը բռնակների միջև */}
            <div 
              className="absolute h-0.5 bg-[#f97316] z-10"
              style={{ 
                left: `${(minValue / 400000) * 100}%`, 
                right: `${100 - (maxValue / 400000) * 100}%` 
              }}
            />

            {/* Պասիվ հետնաֆոնի բարակ գիծ */}
            <div className="absolute left-0 right-0 h-0.5 bg-[#f1f5f9] rounded-full" />

            {/* Ձախակողմյան գնի պիտակ */}
            <div 
              className="absolute -top-7 transform -translate-x-1/2 bg-[#f97316] text-white font-semibold text-[11px] px-3 py-1 rounded-full shadow-sm flex items-center gap-0.5 whitespace-nowrap pointer-events-none z-30"
              style={{ left: `${(minValue / 400000) * 100}%` }}
            >
              {minValue.toLocaleString()} {getCurrencySymbol()}
            </div>

            {/* Ձախ նուրբ բռնակ (Thumb) */}
            <div 
              className="absolute w-3.5 h-3.5 rounded-full border-2 border-[#f97316] bg-white shadow-sm z-20 -translate-x-1/2 pointer-events-none"
              style={{ left: `${(minValue / 400000) * 100}%` }}
            />

            {/* Աջակողմյան գնի պիտակ */}
            <div 
              className="absolute -top-7 transform -translate-x-1/2 bg-[#f97316] text-white font-semibold text-[11px] px-3 py-1 rounded-full shadow-sm flex items-center gap-0.5 whitespace-nowrap pointer-events-none z-30"
              style={{ left: `${(maxValue / 400000) * 100}%` }}
            >
              {maxValue.toLocaleString()} {getCurrencySymbol()}
            </div>

            {/* Աջ նուրբ բռնակ (Thumb) */}
            <div 
              className="absolute w-3.5 h-3.5 rounded-full border-2 border-[#f97316] bg-white shadow-sm z-20 -translate-x-1/2 pointer-events-none"
              style={{ left: `${(maxValue / 400000) * 100}%` }}
            />

            {/* Իրական HTML Range Inputs */}
            <input 
              type="range"
              min="0"
              max="400000"
              step="5000"
              value={minValue}
              onChange={(e) => setMinValue(Math.min(Number(e.target.value), maxValue - 20000))}
              className="absolute w-full h-4 opacity-0 pointer-events-auto cursor-pointer z-40 accent-[#f97316]"
            />
            <input 
              type="range"
              min="0"
              max="400000"
              step="5000"
              value={maxValue}
              onChange={(e) => setMaxValue(Math.max(Number(e.target.value), minValue + 20000))}
              className="absolute w-full h-4 opacity-0 pointer-events-auto cursor-pointer z-40 accent-[#f97316]"
            />

          </div>
        </div>

      </div>
    </div>
  );
}