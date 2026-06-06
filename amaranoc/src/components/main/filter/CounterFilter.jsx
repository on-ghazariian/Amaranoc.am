import React from 'react';

function CounterFilter({ value }) {
  return (
    <div className="flex items-center gap-3.5">
      <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#e2e8f0] bg-[#f7fafc] text-xl text-[#718096]" readOnly>-</button>
      <span className="min-w-5 text-center text-[15px] font-semibold text-[#0b1a30]">{value}</span>
      <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#e2e8f0] bg-[#f7fafc] text-xl text-[#718096]" readOnly>+</button>
    </div>
  );
}

export default CounterFilter;