import React from 'react';

function CounterFilter({ value, onChange }) {
  const handleDecrement = () => {
    if (value > 0 && onChange) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (onChange) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center gap-4 sm:gap-3.5 select-none">
      <button 
        type="button"
        onClick={handleDecrement}
        className="flex h-9 w-9 sm:h-8 sm:w-8 cursor-pointer items-center justify-center rounded-full border border-[#e2e8f0] bg-[#f7fafc] text-xl text-[#718096] transition-colors hover:border-[#0b1a30]/40 active:bg-gray-100" 
      >
        -
      </button>
      
      <span className="min-w-[24px] sm:min-w-5 text-center text-base sm:text-[15px] font-semibold text-[#0b1a30]">
        {value}
      </span>
      
      <button 
        type="button"
        onClick={handleIncrement}
        className="flex h-9 w-9 sm:h-8 sm:w-8 cursor-pointer items-center justify-center rounded-full border border-[#e2e8f0] bg-[#f7fafc] text-xl text-[#718096] transition-colors hover:border-[#0b1a30]/40 active:bg-gray-100" 
      >
        +
      </button>
    </div>
  );
}

export default CounterFilter;