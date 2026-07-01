import React from 'react';

function CurrencySelector({ value, onChange }) {
  const currencies = [
    { symbol: '֏', code: 'AMD' },
    { symbol: '$', code: 'USD' },
    { symbol: '€', code: 'EUR' },
    { symbol: '₽', code: 'RUB' }
  ];

  return (
    <div className="mb-2 flex justify-end gap-2 sm:gap-1.5 select-none">
      {currencies.map((cur) => {
        const isActive = value === cur.code;
        return (
          <button
            key={cur.code}
            type="button"
            onClick={() => onChange && onChange(cur.code)}
            className={`flex h-9 w-9 sm:h-7 sm:w-7 cursor-pointer items-center justify-center rounded-full border transition-colors text-sm sm:text-[13px] ${
              isActive
                ? 'border-[#0b1a30] bg-[#0b1a30] text-white'
                : 'border-[#e2e8f0] bg-white text-[#4a5568] hover:border-[#0b1a30]/40 active:bg-gray-50'
            }`}
          >
            {cur.symbol}
          </button>
        );
      })}
    </div>
  );
}

export default CurrencySelector;