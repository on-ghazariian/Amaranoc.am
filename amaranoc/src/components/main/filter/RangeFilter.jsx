import React from 'react';

function RangeFilter() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5">
      <input 
        type="text" 
        placeholder="Սկսած" 
        className="w-full rounded-md border border-[#e2e8f0] px-3 py-3 sm:px-3.5 sm:py-2.5 text-base sm:text-sm text-[#4a5568] outline-none placeholder:text-[#cbd5e1] transition-colors focus:border-[#0b1a30]/40" 
        readOnly 
      />
      <span className="text-[#cbd5e1] select-none">•</span>
      <input 
        type="text" 
        placeholder="Մինչև" 
        className="w-full rounded-md border border-[#e2e8f0] px-3 py-3 sm:px-3.5 sm:py-2.5 text-base sm:text-sm text-[#4a5568] outline-none placeholder:text-[#cbd5e1] transition-colors focus:border-[#0b1a30]/40" 
        readOnly 
      />
    </div>
  );
}

export default RangeFilter;