import React from 'react';

function CurrencySelector() {
  return (
    <div className="mb-2 flex justify-end gap-2 sm:gap-1.5 select-none">
      <button className="flex h-9 w-9 sm:h-7 sm:w-7 cursor-pointer items-center justify-center rounded-full border border-[#0b1a30] bg-[#0b1a30] text-sm sm:text-[13px] text-white transition-colors">
        ֏
      </button>
      <button className="flex h-9 w-9 sm:h-7 sm:w-7 cursor-pointer items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-sm sm:text-[13px] text-[#4a5568] transition-colors hover:border-[#0b1a30]/40 active:bg-gray-50">
        $
      </button>
      <button className="flex h-9 w-9 sm:h-7 sm:w-7 cursor-pointer items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-sm sm:text-[13px] text-[#4a5568] transition-colors hover:border-[#0b1a30]/40 active:bg-gray-50">
        €
      </button>
      <button className="flex h-9 w-9 sm:h-7 sm:w-7 cursor-pointer items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-sm sm:text-[13px] text-[#4a5568] transition-colors hover:border-[#0b1a30]/40 active:bg-gray-50">
        ₽
      </button>
    </div>
  );
}

export default CurrencySelector;