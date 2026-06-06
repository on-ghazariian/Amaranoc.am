import React from 'react';

export default function ServiceGrid() {
    const servicesDb = [
      {
        id: 1,
        title: "Մատուցող",
        desc: "Յուրաքանչյուր մատուցող կարող է սպասարկել 15-20 անձի։ Ծառայության արժեքը կախված է միջոցառման անցկացման վայրից։ Ձեր միջոցառման կազմակերպման գործում Ձեզ կօգնեն մեր փորձառու մատուցողները՝ հաղորդակցման գերազանց հմտություններով և մանրուքների հանդեպ...",
        price: "20,000",
        img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1724331775249--0.16594454212797016image.webp&w=1920&q=75", // Ժամանակավոր ռեալիստիկ նկար
      },
      {
        id: 2,
        title: "Բարմեն",
        desc: "Մեր պրոֆեսիոնալ բարմենները տիրապետում են տարբեր տեսակի խմիչքների պատրաստման հմտություններին։ Մեր բարմենները պատասխանատու են բարում նստած հաճախորդներին բարձրակարգ սպասարկում մատուցելու համար, ինչպես նաև հյուրերին խմիչքների ընտրության...",
        price: "25,000",
        img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1724330468263--0.5829426973721912image.webp&w=1920&q=75",
      },
      {
        id: 3,
        title: "Խոհարար",
        desc: "Արժեքը կախված է միջոցառման անձանց քանակից և ուտեստների մենյուից։ Ունենալով հարուստ փորձ և տաղանդ, մեր խոհարարները ստեղծում են համերի և նրբաճաշակության զարմանալի համադրություններ։ Նրանք ընտրում են միայն ամենաթարմ և ամենաբարձր որակի...",
        price: "35,000",
        img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1724331582281--0.8016246618454268image.webp&w=1920&q=75",
      },
      {
        id: 4,
        title: "Հանդիսավար",
        desc: "Այս բաժնում մենք կփորձենք օգնել Ձեզ հանդիսավարի (թամադայի) ընտրության հարցում, քանի որ միայն իսկական հանդիսավարը կարող է իր վարպետությամբ ստեղծել հիասքանչ և տոնական մթնոլորտ։",
        price: "60,000",
        img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1724346434036--0.5362400594372552image.webp&w=1920&q=75",
      },
      {
        id: 5,
        title: "Փրփուր Փարթի",
        desc: "Նյութերը սերտիֆիկացված են, աչքերը չեն մորմոքեցնում, ալերգիա չեն առաջացնում, անվնաս են նաև բույսերի և լողավազանի համար։",
        price: "26,900",
        img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1725721755318--0.3513684578103693image.webp&w=1920&q=75",
      },
    ];
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 bg-white font-sans">
      
      {/* Լայնացված Grid համակարգ՝ gap-8-ով, որը քարտերին ավելի շատ լայնություն է տալիս */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {servicesDb.map((service) => (
          <div 
            key={service.id} 
            // max-w-[380px]-ով և w-full-ով քարտերը դարձնում ենք ավելի լայն ու հզոր
            className="flex flex-col w-full max-w-[380px] bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-3px_rgba(0,0,0,0.08)] border border-slate-100 transition-all duration-300 hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.12)]"
          >
            {/* Քարտի Նկարի բաժինը */}
            <div className="h-[240px] w-full overflow-hidden bg-slate-100">
              <img 
                src={service.img} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Քարտի Տեքստային բաժինը */}
            <div className="p-5 flex flex-col flex-1 justify-between gap-5">
              <div>
                {/* Վերնագիրը մեծացված է (text-lg) */}
                <h3 className="text-lg font-bold text-[#1a2530] mb-2.5 cursor-pointer hover:text-[#ff8c00] transition-colors">
                  {service.title}
                </h3>
                
                {/* Նկարագրությունը մեծացված է (text-[14px]) */}
                <p className="text-[14px] leading-relaxed text-[#5e6c7a] line-clamp-4">
                  {service.desc}
                </p>
              </div>

              {/* Գին և Ամրագրել կոճակ */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                {/* Գինը մեծացված տեքստով (text-base) */}
                <div className="flex items-center gap-2 text-[#1a2530] font-bold text-base">
                  <i className="fa-regular fa-clock text-sm text-[#ff8c00]"></i>
                  <span>{service.price} ֏</span>
                </div>

                {/* Ամրագրել կոճակ (մի փոքր ավելի մեծ padding-ներով) */}
                <button className="px-5 py-2 border border-[#ff8c00] text-[#ff8c00] text-xs font-semibold rounded-full bg-transparent hover:bg-[#ff8c00] hover:text-white transition-all duration-300 cursor-pointer">
                  Ամրագրել
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

