import React from 'react';
import { NavLink } from 'react-router-dom'; // Ներմուծում ենք NavLink-ը

function Navigation() {
 
  const menuItems = [
    { name: 'Գլխավոր', path: '/' },
    { name: 'Զեղչեր', path: '/discounts' },
    { name: 'Ծառայություններ', path: '/Services' },
    { name: 'Մեր մասին', path: '/about' }
  ];

  return (
    <nav className="flex flex-wrap justify-center gap-6 font-sans sm:gap-10 lg:gap-[50px]">
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          // isActive-ի միջոցով ավտոմատ ստուգում ենք՝ արդյոք տվյալ լինկի էջում ենք, թե ոչ
          className={({ isActive }) => 
            `cursor-pointer pb-1 text-sm text-[#1a2530] transition-all duration-300 border-b-2 ${
              isActive ? 'border-[#ff8c00]' : 'border-transparent'
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