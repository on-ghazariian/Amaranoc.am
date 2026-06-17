import React from 'react';
import FilterGroup from './FilterGroup';
import CheckboxFilter from './CheckboxFilter';
import RangeFilter from './RangeFilter';
import CounterFilter from './CounterFilter';
import BadgeFilter from './BadgeFilter';
import CurrencySelector from './CurrencySelector';

function Filter() {
  return (
    <aside className="w-full xl:w-[280px] 2xl:w-[300px] shrink-0 flex flex-col gap-5 rounded-2xl border border-[#e0e0e0] bg-white p-4 sm:p-5 font-sans">
      <FilterGroup title="Տարածաշրջան">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:flex xl:flex-col gap-2 sm:gap-1">
          <CheckboxFilter label="Ծաղկաձոր" count={11} checked />
          <CheckboxFilter label="Դիլիջան" count={1} />
          <CheckboxFilter label="Երևան" count={0} />
          <CheckboxFilter label="Էջմիածին" count={0} />
          <CheckboxFilter label="Փարաքար" count={0} />
        </div>
      </FilterGroup>

      <FilterGroup title="Արժեք">
        <div className="flex flex-col sm:flex-row xl:flex-col gap-3 sm:items-center xl:items-stretch">
          <CurrencySelector />
          <div className="w-full">
            <RangeFilter />
          </div>
        </div>
      </FilterGroup>

      <FilterGroup title="Մարդկանց թույլատրելի քանակ">
        <CounterFilter value={1} />
      </FilterGroup>

      <FilterGroup title="Գիշերակացի առկայություն">
        <BadgeFilter options={['Բոլորը', 'Այո', 'Ոչ']} activeIndex={0} />
      </FilterGroup>

      <FilterGroup title="Մարդկանց թույլատրելի քանակը գիշերակացով">
        <CounterFilter value={0} />
      </FilterGroup>

      <FilterGroup title="Սենյակների քանակ">
        <BadgeFilter options={['Բոլորը', '1', '2', '3', '4', '5', '6 և ավելի']} activeIndex={0} />
      </FilterGroup>

      <FilterGroup title="Սանհանգույցների քանակ">
        <BadgeFilter options={['Բոլորը', '1', '2', '3+']} activeIndex={0} />
      </FilterGroup>

      <FilterGroup title="Լողավազան">
        <BadgeFilter options={['Բոլորը', 'Բաց', 'Փակ', 'Տաքացվող', 'Առանց լողավազանի']} activeIndex={0} />
      </FilterGroup>

      <FilterGroup title="Առավելություններ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:flex xl:flex-col gap-2 sm:gap-1">
          <CheckboxFilter label="Շոգեբաղնիք" />
          <CheckboxFilter label="Ջակուզի" />
          <CheckboxFilter label="Բիլիարդ" />
          <CheckboxFilter label="Սեղանի թենիս" />
          <CheckboxFilter label="Բացօթյա տաղավար" />
          <CheckboxFilter label="Փակ տաղավար" />
          <CheckboxFilter label="Մանղալ" />
          <CheckboxFilter label="Ճոճանակ" />
        </div>
      </FilterGroup>
    </aside>
  );
}

export default Filter;