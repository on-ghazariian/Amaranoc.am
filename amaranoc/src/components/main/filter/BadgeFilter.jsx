import React from 'react';

function BadgeFilter({ options, activeValue, onChange }) {
  return (
    <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 flex-nowrap sm:flex-wrap no-scrollbar">
      {options.map((opt, idx) => (
        <button 
          key={idx} 
          type="button"
          onClick={() => onChange && onChange(opt)}
          className={`cursor-pointer whitespace-nowrap rounded-[20px] border px-3 py-1.5 text-xs transition-all duration-200 sm:px-4 sm:py-2 sm:text-[13px] ${
            opt === activeValue 
              ? 'border-[#0b1a30] bg-[#0b1a30] text-white' 
              : 'border-[#e2e8f0] bg-white text-[#4a5568] hover:border-[#0b1a30]/40'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default BadgeFilter;