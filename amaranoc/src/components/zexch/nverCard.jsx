import React, { useState } from 'react';

export default function NverCard() {
  const [selectedAmount, setSelectedAmount] = useState(50000);

  const amounts = [50000, 60000, 70000, 80000, 90000, 100000];

  return (
    <div className="w-full bg-white py-8 select-none font-sans">
      <div className="mx-auto max-w-[1200px] flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* Ձախակողմյան տեքստային բլոկ */}
        <div className="flex-1 flex flex-col justify-center bg-white border border-[#f1f5f9] rounded-2xl p-5 sm:p-8 md:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0f172a] uppercase tracking-wide leading-tight mb-4">
            Պատվիրի՛ր <span className="text-[#f97316]">նվեր քարտ</span> <br />
            քո կամ ընկերներիդ համար
          </h2>
          
          <hr className="w-full border-0 border-t border-[#e2e8f0] mb-4" />
          
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-medium">
            Բաց մի՛ թող մեր բացառիկ զեղչի քարտերը։ Եթե պլանավորում ես քո հաջորդ 
            արձակուրդը՝ ընկերներիդ կամ ընտանիքիդ անդամների հետ, մեր զեղչային 
            քարտերը առաջարկում են անգերազանցելի խնայողություններ ամառանոցների 
            և ծառայությունների լայն տեսականիով։ Ընտրի՛ր զեղչի չափը քարտի վրա։
          </p>
        </div>

        {/* Աջակողմյան նարնջագույն քարտ */}
        <div className="flex-1 bg-gradient-to-br from-[#ff9f43] to-[#ff6b6b] sm:to-[#f97316] rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col items-center justify-between text-white shadow-[0_10px_30px_rgba(249,115,22,0.2)] min-h-[320px] sm:min-h-[350px]">
          
          {/* Լոգոյի հատված */}
          <div className="flex flex-col items-center gap-1 mt-2">
            <div className="text-lg sm:text-xl font-bold tracking-[0.2em] flex items-center gap-1">
              AMARAN<span className="border-2 border-white px-1 py-0.5 rounded text-xs font-black">H</span>C<span className="text-xs tracking-normal font-light">.AM</span>
            </div>
            <div className="text-[9px] tracking-[0.3em] uppercase opacity-80">
              by hasce.am
            </div>
          </div>

          {/* Գումարների ընտրության ցանց (Grid) */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full my-6 max-w-[420px]">
            {amounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`py-2 px-1 rounded-full border text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer text-center ${
                  selectedAmount === amount
                    ? 'bg-white text-[#f97316] border-white shadow-md scale-105'
                    : 'bg-white/10 text-white border-white/40 hover:bg-white/20'
                }`}
              >
                {amount.toLocaleString()} ֏
              </button>
            ))}
          </div>

          {/* Պատվիրել կոճակ */}
          <button className="w-full max-w-[180px] bg-[#ffa801] hover:bg-white hover:text-[#f97316] text-white font-bold text-sm py-2.5 px-6 rounded-full shadow-lg transition-all duration-300 cursor-pointer transform active:scale-95 text-center">
            Պատվիրել
          </button>

        </div>

      </div>
    </div>
  );
}