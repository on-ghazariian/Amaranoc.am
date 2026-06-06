import React from 'react';

function BadgeFilter({ options, activeIndex }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt, idx) => (
        <button 
          key={idx} 
          className={`cursor-pointer rounded-[20px] border px-4 py-2 text-[13px] transition-colors ${
            idx === activeIndex 
              ? 'border-[#0b1a30] bg-[#0b1a30] text-white' 
              : 'border-[#e2e8f0] bg-white text-[#4a5568]'
          }`}
          readOnly
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default BadgeFilter;