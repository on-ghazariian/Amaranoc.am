import React from 'react';

function CheckboxFilter({ label, count, checked }) {
  return (
    <label className="flex cursor-pointer items-center justify-between text-sm text-[#4a5568]">
      <div className="flex items-center gap-2.5">
        <input 
          type="checkbox" 
          defaultChecked={checked} 
          readOnly 
          className="h-4 w-4 rounded border-[#cbd5e1] accent-[#0b1a30]"
        />
        <span>{label}</span>
      </div>
      {count !== undefined && <span className="text-[13px] text-[#a0aec0]">{count}</span>}
    </label>
  );
}

export default CheckboxFilter;