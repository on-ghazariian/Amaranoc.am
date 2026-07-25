import React, { useState } from 'react';

const FooterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Ուղարկված տվյալներ:', formData);
    setFormData({ fullName: '', phone: '', email: '' });
  };

  return (
    <>
      <section 
        className="mt-20 w-full flex items-center justify-center bg-cover bg-center bg-no-repeat px-5 py-[95px]"
        style={{ backgroundImage: `url('https://amaranoc.am/images/footer/home-add-application.png')` }}
      >
        <div className="w-full max-w-[1100px] border border-white/15 bg-white/5 p-5 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-[15px] rounded-[20px] md:max-w-[1100px] md:px-[60px] md:py-10">
          
          <div className="mb-[15px] flex items-center justify-center gap-5">
            <span className="hidden h-px max-w-[200px] flex-grow bg-white/40 md:block"></span>
            <h2 className="text-xl font-bold tracking-wide text-white whitespace-nowrap md:text-[28px]">
              ՏԵՂԱԴՐԵԼ ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆ
            </h2>
            <span className="hidden h-px max-w-[200px] flex-grow bg-white/40 md:block"></span>
          </div>
          
          <p className="mb-[35px] text-sm text-white/80">
            Մուտքագրեք Ձեր տվյալները նշված դաշտերում և մենք կկապնվենք Ձեզ հետ
          </p>
          
          <form className="flex flex-col flex-wrap justify-center gap-[15px] md:flex-row md:items-center" onSubmit={handleSubmit}>
            
            <div className="w-full min-w-[220px] md:flex-1">
              <input 
                type="text" 
                name="fullName"
                placeholder="Անուն Ազգանուն" 
                className="w-full rounded-xl border border-white/25 bg-black/20 px-5 py-[14px] text-sm text-white outline-none transition-all placeholder:text-white/50 focus:border-[#ff9f43] focus:bg-black/40"
                value={formData.fullName}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="w-full min-w-[220px] md:flex-1">
              <input 
                type="text" 
                name="phone"
                placeholder="Հեռախոսահամար" 
                className="w-full rounded-xl border border-white/25 bg-black/20 px-5 py-[14px] text-sm text-white outline-none transition-all placeholder:text-white/50 focus:border-[#ff9f43] focus:bg-black/40"
                value={formData.phone}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="w-full min-w-[220px] md:flex-1">
              <input 
                type="email" 
                name="email"
                placeholder="Էլ. հասցե" 
                className="w-full rounded-xl border border-white/25 bg-black/20 px-5 py-[14px] text-sm text-white outline-none transition-all placeholder:text-white/50 focus:border-[#ff9f43] focus:bg-black/40"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            <button 
              type="submit" 
              className="w-full rounded-xl border-none bg-[#ff9f43] px-[35px] py-[14px] text-base font-semibold text-white whitespace-nowrap transition-all cursor-pointer hover:bg-[#e08528] active:scale-[0.98] md:w-auto"
            >
              Ուղարկել
            </button>

          </form>

        </div>
      </section>

      <footer 
        className="w-full bg-[#0e1622] text-white pt-[164px] pb-[222px] px-5 bg-[bottom_center] bg-no-repeat bg-contain"
        style={{ backgroundImage: `url('https://amaranoc.am/_next/image?url=%2Fimages%2Ffooter%2Ffooter-background.png&w=1920&q=75')` }}
      >
        <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center">
          
          <h2 className="text-2xl sm:text-3xl font-bold tracking-widest mb-10 uppercase">
            ԿՈՆՏԱԿՏՆԵՐ
          </h2>

          <div className="w-full flex flex-wrap justify-center items-center gap-y-4 gap-x-8 lg:gap-x-12 mb-8 text-xs sm:text-sm font-medium tracking-wider text-slate-300">
            <a href="tel:041611611" className="flex items-center gap-2 hover:text-white transition-colors">
              <span>📞</span> 041-611-611
            </a>
            <a href="mailto:amaranoc.info@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors uppercase">
              <span>✉</span> amaranoc.info@gmail.com
            </a>
            <a href="https://instagram.com/amaranoc.am" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors uppercase">
              <span>📸</span> amaranoc.am
            </a>
            <a href="https://facebook.com/amaranoc.am" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors uppercase">
              <span>👤</span> amaranoc.am
            </a>
            <span className="flex items-center gap-2 uppercase">
              <span>📍</span> Թումանյան 5
            </span>
          </div>

          <div className="mb-6">
            <a href="#" className="text-xs sm:text-sm text-slate-400 hover:text-white underline underline-offset-4 transition-colors">
              Գաղտնիության քաղաքականություն
            </a>
          </div>

          <div className="text-[11px] sm:text-xs tracking-widest text-slate-400 font-light">
            Ամառանոց ՍՊԸ | Amaranoc LLC | Амараноц ООО
          </div>

        </div>
      </footer>
    </>
  );
};

export default FooterForm;