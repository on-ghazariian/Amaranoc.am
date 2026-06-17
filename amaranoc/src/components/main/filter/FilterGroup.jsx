import React from 'react';

function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-[#f0f0f0] pb-5 last:border-none last:pb-0">
      <h4 className="mb-3.5 sm:mb-3 text-base sm:text-sm font-bold text-[#0b1a30]">
        {title}
      </h4>
      <div className="flex flex-col gap-3 sm:gap-2.5">
        {children}
      </div>
    </div>
  );
}

export default FilterGroup;