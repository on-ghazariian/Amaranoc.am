import React, { useState, useEffect, useMemo } from 'react';
import FilterGroup from './FilterGroup';
import CheckboxFilter from './CheckboxFilter';
import RangeFilter from './RangeFilter';
import CounterFilter from './CounterFilter';
import BadgeFilter from './BadgeFilter';
import CurrencySelector from './CurrencySelector';

function Filter({ onFilterChange, db = [] }) {
  const [filters, setFilters] = useState({
    regions: [], 
    minPrice: 0,
    maxPrice: 10000000,
    currency: 'AMD',
    peopleCount: 1,
    isSleep: 'Բոլորը',
    peopleSleepCount: 0,
    rooms: 'Բոլորը',
    tualets: 'Բոլորը',
    baseyn: 'Բոլորը',
    advantages: []
  });

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

  const regionCounts = useMemo(() => {
    const counts = {};
    
    db.forEach(item => {
      if (item.addres) {
        counts[item.addres] = (counts[item.addres] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count); 
  }, [db]);

  const handleCheckboxChange = (group, label, isChecked) => {
    setFilters(prev => {
      const currentItems = prev[group];
      const updatedItems = isChecked 
        ? [...currentItems, label] 
        : currentItems.filter(item => item !== label);
      return { ...prev, [group]: updatedItems };
    });
  };

  const handleSelectChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <aside className="w-full xl:w-[280px] 2xl:w-[300px] shrink-0 flex flex-col gap-5 rounded-2xl border border-[#e0e0e0] bg-white p-4 sm:p-5 font-sans">
      
      <FilterGroup title="Տարածաշրջան">
        {/* Այս հատվածը հիմա բոլոր էկրանների վրա ունի նույն ֆիքսված բարձրությունը և scroll-ը */}
        <div className="flex flex-col gap-1.5 max-h-[180px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {regionCounts.length > 0 ? (
            regionCounts.map(region => (
              <CheckboxFilter 
                key={region.name}
                label={region.name} 
                count={region.count}
                checked={filters.regions.includes(region.name)}
                onChange={(isChecked) => handleCheckboxChange('regions', region.name, isChecked)}
              />
            ))
          ) : (
            <div className="text-xs text-gray-400 py-1">Տվյալներ չկան</div>
          )}
        </div>
      </FilterGroup>

      <FilterGroup title="Արժեք">
        <div className="flex flex-col sm:flex-row xl:flex-col gap-3 sm:items-center xl:items-stretch">
          <CurrencySelector 
            value={filters.currency} 
            onChange={(val) => handleSelectChange('currency', val)} 
          />
          <div className="w-full">
            <RangeFilter 
              min={filters.minPrice} 
              max={filters.maxPrice} 
              onChange={(min, max) => setFilters(prev => ({ ...prev, minPrice: min || 0, maxPrice: max || 10000000 }))} 
            />
          </div>
        </div>
      </FilterGroup>

      <FilterGroup title="Մարդկանց թույլատրելի քանակ">
        <CounterFilter 
          value={filters.peopleCount} 
          onChange={(val) => handleSelectChange('peopleCount', val)} 
        />
      </FilterGroup>

      <FilterGroup title="Գիշերակացի առկայություն">
        <BadgeFilter 
          options={['Բոլորը', 'Այո', 'Ոչ']} 
          activeIndex={filters.isSleep === 'Բոլորը' ? 0 : filters.isSleep === 'Այո' ? 1 : 2} 
          onChange={(val) => handleSelectChange('isSleep', val)}
        />
      </FilterGroup>

      <FilterGroup title="Մարդկանց թույլատրելի քանակը գիշերակացով">
        <CounterFilter 
          value={filters.peopleSleepCount} 
          onChange={(val) => handleSelectChange('peopleSleepCount', val)} 
        />
      </FilterGroup>

      <FilterGroup title="Սենյակների քանակ">
        <BadgeFilter 
          options={['Բոլորը', '1', '2', '3', '4', '5', '6 և ավելի']} 
          activeIndex={['Բոլորը', '1', '2', '3', '4', '5', '6 և ավելի'].indexOf(filters.rooms)} 
          onChange={(val) => handleSelectChange('rooms', val)}
        />
      </FilterGroup>

      <FilterGroup title="Սանհանգույցների քանակ">
        <BadgeFilter 
          options={['Բոլորը', '1', '2', '3+']} 
          activeIndex={['Բոլորը', '1', '2', '3+'].indexOf(filters.tualets)} 
          onChange={(val) => handleSelectChange('tualets', val)}
        />
      </FilterGroup>

      <FilterGroup title="Լողավազան">
        <BadgeFilter 
          options={['Բոլորը', 'Բաց', 'Փակ', 'Տաքացվող', 'Առանց լողավազանի']} 
          activeIndex={['Բոլորը', 'Բաց', 'Փակ', 'Տաքացվող', 'Առանց լողավազանի'].indexOf(filters.baseyn)} 
          onChange={(val) => handleSelectChange('baseyn', val)}
        />
      </FilterGroup>

      <FilterGroup title="Առավելություններ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:flex xl:flex-col gap-2 sm:gap-1.5">
          {['Շոգեբաղնիք', 'Ջակուզի', 'Բիլիարդ', 'Սեղանի թենիս', 'Բացօթյա տաղավար', 'Փակ տաղավար', 'Մանղալ', 'Ճոճանակ', 'Կանաչապատ այգի'].map(adv => (
            <CheckboxFilter 
              key={adv}
              label={adv} 
              checked={filters.advantages.includes(adv)}
              onChange={(isChecked) => handleCheckboxChange('advantages', adv, isChecked)}
            />
          ))}
        </div>
      </FilterGroup>
    </aside>
  );
}

export default Filter;