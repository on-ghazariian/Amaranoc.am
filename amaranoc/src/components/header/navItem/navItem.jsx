import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  const menuItems = [
    { name: 'Գլխավոր', path: '/' },
    { name: 'Զեղչեր', path: '/zexch' },
    { name: 'Ծառայություններ', path: '/services' },
    { name: 'Մեր մասին', path: '/about' }
  ];

  return (
    <nav className="flex flex-row items-center justify-center gap-4 py-4 px-2 font-sans sm:gap-8 md:gap-10 lg:gap-[50px]">
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) => 
            `cursor-pointer pb-1 text-xs sm:text-sm md:text-base font-medium text-[#1a2530] transition-all duration-300 border-b-2 ${
              isActive ? 'border-[#ff8c00]' : 'border-transparent hover:border-[#ff8c00]/40'
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;