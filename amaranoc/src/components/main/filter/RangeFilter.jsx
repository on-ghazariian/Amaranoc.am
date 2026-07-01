import React from 'react';

function RangeFilter({ min, max, onChange }) {
  const handleMinChange = (e) => {
    const val = e.target.value === '' ? '' : Number(e.target.value);
    if (onChange) onChange(val, max);
  };

  const handleMaxChange = (e) => {
    const val = e.target.value === '' ? '' : Number(e.target.value);
    if (onChange) onChange(min, val);
  };

  return (
    <div className="flex items-center gap-2 sm:gap-2.5">
      <input 
        type="number" 
        value={min === 0 ? '' : min}
        onChange={handleMinChange}
        placeholder="Սկսած" 
        className="w-full rounded-md border border-[#e2e8f0] px-3 py-3 sm:px-3.5 sm:py-2.5 text-base sm:text-sm text-[#4a5568] outline-none placeholder:text-[#cbd5e1] transition-colors focus:border-[#0b1a30]/40 [appearance:textfield] [&::-webkit-outer-spin-button]:margin-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-0 [&::-webkit-inner-spin-button]:appearance-none" 
      />
      <span className="text-[#cbd5e1] select-none">•</span>
      <input 
        type="number" 
        value={max === Infinity || max === 10000000 ? '' : max}
        onChange={handleMaxChange}
        placeholder="Մինչև" 
        className="w-full rounded-md border border-[#e2e8f0] px-3 py-3 sm:px-3.5 sm:py-2.5 text-base sm:text-sm text-[#4a5568] outline-none placeholder:text-[#cbd5e1] transition-colors focus:border-[#0b1a30]/40 [appearance:textfield] [&::-webkit-outer-spin-button]:margin-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-0 [&::-webkit-inner-spin-button]:appearance-none" 
      />
    </div>
  );
}

export default RangeFilter;