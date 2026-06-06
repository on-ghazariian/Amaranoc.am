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
    <section 
      className="mt-20 flex items-center justify-center bg-cover bg-center bg-no-repeat px-5 py-[60px]"
      style={{ backgroundImage: `url('https://amaranoc.am/images/footer/home-add-application.png')` }}
    >
      <div className="w-full max-width-[1100px] border border-white/15 bg-white/5 p-5 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-[15px] rounded-[20px] md:max-w-[1100px] md:px-[60px] md:py-10">
        
        {/* Վերնագրի հատվածը գծերով */}
        <div className="mb-[15px] flex items-center justify-center gap-5">
          <span className="hidden h-px max-w-[200px] flex-grow bg-white/40 md:block"></span>
          <h2 className="text-xl font-bold tracking-wide text-white whitespace-nowrap md:text-[28px]">
            ՏԵՂԱԴՐԵԼ ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆ
          </h2>
          <span className="hidden h-px max-w-[200px] flex-grow bg-white/40 md:block"></span>
        </div>
        
        {/* Ենթավերնագիր */}
        <p className="mb-[35px] text-sm text-white/80">
          Մուտքագրեք Ձեր տվյալները նշված դաշտերում և մենք կկապնվենք Ձեզ հետ
        </p>
        
        {/* Ֆորմա */}
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

          <div className="w-full min-w-55 md:flex-1">
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
  );
};

export default FooterForm;