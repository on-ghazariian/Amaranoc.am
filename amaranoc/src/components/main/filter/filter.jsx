import React from 'react';
import FilterGroup from './FilterGroup';
import CheckboxFilter from './CheckboxFilter';
import RangeFilter from './RangeFilter';
import CounterFilter from './CounterFilter';
import BadgeFilter from './BadgeFilter';
import CurrencySelector from './CurrencySelector';

function Filter() {
  return (
    <aside className="flex w-[280px] shrink-0 flex-col gap-5 rounded-2xl border border-[#e0e0e0] bg-white p-5 font-sans">
      <FilterGroup title="Տարածաշրջան">
        <CheckboxFilter label="Ծաղկաձոր" count={11} checked />
        <CheckboxFilter label="Դիլիջան" count={1} />
        <CheckboxFilter label="Երևան" count={0} />
        <CheckboxFilter label="Էջմիածին" count={0} />
        <CheckboxFilter label="Փարաքար" count={0} />
      </FilterGroup>

      <FilterGroup title="Արժեք">
        <CurrencySelector />
        <RangeFilter />
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
        <CheckboxFilter label="Շոգեբաղնիք" />
        <CheckboxFilter label="Ջակուզի" />
        <CheckboxFilter label="Բիլիարդ" />
        <CheckboxFilter label="Սեղանի թենիս" />
        <CheckboxFilter label="Բացօթյա տաղավար" />
        <CheckboxFilter label="Փակ տաղավար" />
        <CheckboxFilter label="Մանղալ" />
        <CheckboxFilter label="Ճոճանակ" />
      </FilterGroup>
    </aside>
  );
}

export default Filter;