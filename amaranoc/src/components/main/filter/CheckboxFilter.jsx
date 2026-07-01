import React from 'react';

function CheckboxFilter({ label, count, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-1.5 sm:py-0.5 text-base sm:text-sm text-[#4a5568] hover:text-[#0b1a30] transition-colors select-none">
      <div className="flex items-center gap-3 sm:gap-2.5">
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={(e) => onChange && onChange(e.target.checked)}
          className="h-5 w-5 sm:h-4 sm:w-4 rounded border-[#cbd5e1] accent-[#0b1a30] cursor-pointer"
        />
        <span className="font-medium sm:font-normal">{label}</span>
      </div>
      {count !== undefined && <span className="text-sm sm:text-[13px] text-[#a0aec0] pl-2">{count}</span>}
    </label>
  );
}

export default CheckboxFilter;