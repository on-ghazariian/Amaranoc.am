import React from 'react'

export default function About() {
  return (
    <>
      <div className="w-full">
        <img 
          src="https://amaranoc.am/_next/image?url=%2Fimages%2Fabout-us%2Ffirst_image.jpg&w=1920&q=75" 
          alt="Top Banner" 
          className="w-full h-180 object-cover" 
        />
      </div>

      <div className="mx-auto max-w-[1300px] px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto rounded-3xl overflow-hidden shadow-sm">
            <img 
              src="https://amaranoc.am/_next/image?url=%2Fimages%2Fabout-us%2Fabout_us.jpg&w=1920&q=75" 
              alt="About Us" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center bg-[#fdfdfd] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#f1f5f9] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="w-6 h-[2px] bg-[#1e293b]"></span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1e293b] tracking-wide uppercase">
                Մեր Մասին
              </h2>
              <span className="flex-1 h-[1px] bg-slate-200"></span>
            </div>

            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#475569] text-justify font-normal">
              <span className="font-semibold text-[#1e293b]">Amaranoc.am</span>-ը վստահության, հավատարմության և գերազանցության ձգտման պատմություն է։ Հանդիսանալով ամառանոցների վարձակալության ոլորտում համար մեկ ընկերությունը՝ մենք ձեզ առաջարկում ենք շքեղ առանձնատների, քոթեջների, վիլլաների և ամառանոցների լայն ու բազմազան ընտրություն։ Մեր հիմնական առաքելությունն է սպասարկել մեր հաճախորդներին ամենաբարձր մակարդակով՝ ստեղծելով հարմարավետության և շքեղության մթնոլորտ։ Մեր յուրաքանչյուր առանձնատունը, մեր նվիրվածությունը և մանրուքների հանդեպ ուշադրությունը երաշխավորում է հիշարժան հանգիստ Հայաստանի ամենահիասքանչ ամառանոցներում։
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1300px] px-4 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          <div className="flex flex-col justify-center bg-[#fdfdfd] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#f1f5f9] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="w-6 h-[2px] bg-[#1e293b]"></span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1e293b] tracking-wide uppercase">
                Մեր Թիմը
              </h2>
              <span className="flex-1 h-[1px] bg-slate-200"></span>
            </div>

            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#475569] text-justify font-normal">
              Շուրջ 20 մասնագետներից բաղկացած մեր պրոֆեսիոնալ թիմն իր աշխատանքն իրականացնում է փայլուն հմտությամբ՝ բավարարելու անգամ ամենաքմահաճ հաճախորդի կարիքները: Շնորհիվ ոլորտում ունեցած մեր անգնահատելի փորձի, մեր նպատակն է անմոռանալի պահեր ստեղծել մեր հյուրերի համար: Մենք պարզապես չենք ստեղծում ժամանց, մենք ստեղծում ենք պատմություններ, և յուրաքանչյուր առանձնատուն (որոնք դուք տեսնում եք մեր կայքում) այդ պատմության մի մասն է: Օրեցօր ընդլայնվելով՝ մենք ձգտում ենք նորագույն չափանիշներ սահմանել ոլորտում և որ ամենակարևորն է մենք օր ըստ օրի հստակ ու կայուն քայլերով շարժվում ենք առաջ՝ բարելավելով մեր երկրում սպասարկման ոլորտը՝ շքեղ առանձնատները հասանելի դարձնելով բոլորին:
            </p>
          </div>

          <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto rounded-3xl overflow-hidden shadow-sm order-1 lg:order-2">
            <img 
              src="https://amaranoc.am/_next/image?url=%2Fimages%2Fabout-us%2Fteam.jpg&w=1920&q=75" 
              alt="Our Team" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <img 
          src="https://amaranoc.am/_next/image?url=%2Fimages%2Fabout-us%2Fsecond.jpg&w=1920&q=75" 
          alt="Middle Banner" 
          className="h-[300px] sm:h-[450px] md:h-[600px] object-cover w-full"
        />
      </div>

      <div className="mx-auto max-w-[1300px] px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto rounded-3xl overflow-hidden shadow-sm">
            <img 
              src="https://amaranoc.am/_next/image?url=%2Fimages%2Fabout-us%2Famaranoc.jpg&w=1920&q=75" 
              alt="Why Cooperate" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center bg-[#fdfdfd] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#f1f5f9] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="w-6 h-[2px] bg-[#1e293b]"></span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1e293b] tracking-wide uppercase">
                Ինչու համագործակցել AMARANOC.AM -ի հետ
              </h2>
              <span className="flex-1 h-[1px] bg-slate-200"></span>
            </div>

            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#475569] text-justify font-normal">
              Amaranoc.am-ի ընտրությունը երաշխավորում է շքեղության, անհատականացված սպասարկման բարձր մակարդակ և իհարկե վստահության հիմքի վրա կառուցված կայուն համագործակցություն: Գերազանցության հանդեպ մեր բարձր ձգտումը և հավատարմությունը, էքսկլյուզիվ առաջարկների լայն ընտրությունը և մեր յուրաքանչյուր հյուրի նախասիրությունների նկատմամբ մանրակրկիտ ուշադրությունը մեզ առանձնացնում են ոլորտում բոլորից՝ դարձնելով առաջատար: Մենք առաջարկում ենք որակ և ստեղծում ենք հարմարավետության բարձր զգացում, որոնք գերազանցում են ձեր բոլոր սպասելիքները: Մենք բարձր ենք գնահատում մեր գործընկերների և մեր հաճախորդների վստահությունը: Այդ վստահությունը մեր ընկերության հիմքն է: Մենք խորապես հակված ենք այն գաղափարին, որ մեր առանձնատներում անցկացրած յուրաքանչյուր պահը պետք է լինի առանձնահատուկ: Մեր գործընկերների և հաճախորդների վստահությունը մեր կարևորագույն արժեքն է, իսկ ամենաբարձր մակարդակով սպասարկումը մեր ընդհանուր նպատակը:
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1300px] px-4 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          <div className="flex flex-col justify-center bg-[#fdfdfd] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#f1f5f9] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="w-6 h-[2px] bg-[#1e293b]"></span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1e293b] tracking-wide uppercase">
                Մարկետինգ
              </h2>
              <span className="flex-1 h-[1px] bg-slate-200"></span>
            </div>

            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#475569] text-justify font-normal">
              Amaranoc.am-ում մենք գիտակցում ենք մարկետինգի առանցքային դերը ամառանոցների վարձակալության ոլորտում: Մեր ռազմավարական մարկետինգային նախաձեռնությունները ներառում են էքսկլյուզիվ համագործակցություններ և շեշտադրում են մեր ամառանոցների եզակի առանձնահատկությունները: 10 մասնագետից բաղկացած մեր պրոֆեսիոնալ մարկետինգի թիմը աշխատում է բարձր պատասխանատվությամբ և նվիրումով, որպեսզի դուք միշտ առաջինը տեղեկացված լինեք լավագույն առաջարկների մասին:
            </p>
          </div>

          <div className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto rounded-3xl overflow-hidden shadow-sm order-1 lg:order-2">
            <img 
              src="https://amaranoc.am/_next/image?url=%2Fimages%2Fabout-us%2Fmarketing.jpg&w=1920&q=75" 
              alt="Marketing" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1300px] px-4 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
          <div className="w-full aspect-[16/10] lg:h-[350px] rounded-3xl overflow-hidden shadow-sm">
            <img 
              src="https://amaranoc.am/_next/image?url=%2Fimages%2Fabout-us%2Fhistory.jpg&w=1920&q=75" 
              alt="Our History" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center bg-[#fdfdfd] rounded-3xl p-6 sm:p-8 border border-[#f1f5f9] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[2px] bg-[#1e293b]"></span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1e293b] tracking-wide uppercase">
                Մեր Պատմությունը
              </h2>
              <span className="flex-1 h-[1px] bg-slate-200"></span>
            </div>

            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#475569] text-justify font-normal">
              Amaranoc.am-ը հիմնադրվել է 2023 թվականի հուլիսի 1-ին և հենց այդ օրվանից սկսած մինչև օրս մենք չենք դադարում զարմացնել մեր հաճախորդներին և գոհացնել մեր գործընկերներին։ Մենք հպարտ ենք, որ այս նախագիծը մեր ողջ թիմի համատեղ ջանքերի արդյունքն է և հանդիսանում է Hasco.am անշարժ գույքի ընկերության ամենակարևոր մաս։ Յուրաքանչյուր քայլ ամրապնդել է մեր հիմնադիր սկզբունքները և առաջ է մղել մեզ ձեռք բերել անուն, որին վստահում են բոլորը։ Եվ եթե դուք այստեղ եք, հավատացած եղեք, որ ամեն ինչ դեռ առջևում է։
            </p>
          </div>
        </div>
      </div>

      <div className="w-full mt-4 sm:mt-8">
        <img 
          src="https://amaranoc.am/_next/image?url=%2Fimages%2Fabout-us%2Fthird.jpg&w=1920&q=75" 
          alt="Bottom Banner" 
          className="w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover" 
        />
      </div>

      <div className="mx-auto max-w-[1300px] px-4 py-12 md:py-16">
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="hidden sm:block flex-1 h-[1px] bg-slate-300"></span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-[#101928] text-center uppercase whitespace-nowrap">
            Կարծիքներ
          </h2>
          <span className="hidden sm:block flex-1 h-[1px] bg-slate-300"></span>
        </div>

        <div className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto lg:overflow-x-visible pb-6 lg:pb-0 scrollbar-none snap-x snap-mandatory">
          <div className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between snap-start">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center border border-slate-300 text-slate-500 font-bold">
                  G
                </div>
                <span className="font-semibold text-sm sm:text-base text-slate-800">Gurgen</span>
              </div>
              <div className="flex gap-0.5 text-amber-500 mb-3 text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                Thanks for providing great service👍👍
              </p>
            </div>
          </div>

          <div className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between snap-start">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-slate-300 text-white font-bold">
                  A
                </div>
                <span className="font-semibold text-sm sm:text-base text-slate-800">Armine</span>
              </div>
              <div className="flex gap-0.5 text-amber-500 mb-3 text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                🥰 Очень довольна, Они очень помогли мне с выбором дома, и дом был просто замечательным.
              </p>
            </div>
          </div>

          <div className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between snap-start">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-300 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="font-semibold text-sm sm:text-base text-slate-800">Aghajanyan Zara</span>
              </div>
              <div className="flex gap-0.5 text-amber-500 mb-3 text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                Ավելի իդեալական չէր կարա լիներ)))
              </p>
            </div>
          </div>

          <div className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between snap-start">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-300 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="font-semibold text-sm sm:text-base text-slate-800">Ani Arzumanyan</span>
              </div>
              <div className="flex gap-0.5 text-amber-500 mb-3 text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                Сдали наш дом имеем отличный результат, очень довольны !:)
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 sm:mt-10">
          <button className="w-full sm:w-auto px-6 py-2.5 bg-[#f97316] text-white rounded-full text-sm font-semibold shadow-sm hover:bg-orange-600 transition-colors duration-200">
            Թողնել կարծիք
          </button>
          <button className="w-full sm:w-auto px-6 py-2.5 bg-transparent text-slate-700 border border-slate-200 rounded-full text-sm font-semibold hover:bg-slate-50 transition-all duration-200">
            Տեսնել բոլորը
          </button>
        </div>
      </div>
    </>
  )
}