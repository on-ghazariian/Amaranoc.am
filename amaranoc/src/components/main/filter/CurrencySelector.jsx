import React from 'react';

function CurrencySelector() {
  return (
    <div className="mb-2 flex justify-end gap-1.5">
      <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#0b1a30] bg-[#0b1a30] text-[13px] text-white">֏</button>
      <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[13px] text-[#4a5568]">$</button>
      <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[13px] text-[#4a5568]">€</button>
      <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[13px] text-[#4a5568]">₽</button>
    </div>
  );
}

export default CurrencySelector;