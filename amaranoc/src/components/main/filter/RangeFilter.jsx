import React from 'react';

function RangeFilter() {
  return (
    <div className="flex items-center gap-2.5">
      <input 
        type="text" 
        placeholder="Սկսած" 
        className="w-full rounded-md border border-[#e2e8f0] px-3.5 py-2.5 text-sm text-[#4a5568] outline-none placeholder:text-[#cbd5e1]" 
        readOnly 
      />
      <span className="text-[#cbd5e1]">•</span>
      <input 
        type="text" 
        placeholder="Մինչև" 
        className="w-full rounded-md border border-[#e2e8f0] px-3.5 py-2.5 text-sm text-[#4a5568] outline-none placeholder:text-[#cbd5e1]" 
        readOnly 
      />
    </div>
  );
}

export default RangeFilter;