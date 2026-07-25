import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from './../lib/firebase';
import { ref, onValue } from 'firebase/database';
import FooterForm from '../components/footer/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, faChevronRight, faTimes, faHeart, 
  faMapMarkerAlt, faCheckCircle, faMapMarkedAlt 
} from '@fortawesome/free-solid-svg-icons';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Header } from '../components/header/header';

const createCustomMarker = (price, image) => {
  return new L.DivIcon({
    html: `
      <div class="relative flex flex-col items-center group cursor-pointer">
        <div class="bg-white p-1 rounded-xl shadow-md border border-slate-200 flex flex-col items-center transition-transform duration-200 group-hover:scale-105">
          <img src="${image}" class="w-16 h-10 object-cover rounded-lg" alt="Map View"/>
          <span class="text-[10px] font-extrabold text-[#f97316] mt-0.5 whitespace-nowrap">${price?.toLocaleString()} ֏</span>
        </div>
        <div class="w-2 h-2 bg-white rotate-45 border-r border-b border-slate-200 -mt-1 shadow-sm"></div>
      </div>
    `,
    className: 'custom-marker-icon',
    iconSize: [70, 60],
    iconAnchor: [35, 60],
    popupAnchor: [0, -60]
  });
};

export default function HomeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  useEffect(() => {
    const listingsRef = ref(db, 'listings'); 
    
    const unsubscribe = onValue(listingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allListings = Object.values(data);
        const foundHome = allListings.find(item => item && item.id === id);
        setHome(foundHome);
      } else {
        setHome(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    if (isSliderOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isSliderOpen]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-lg font-semibold animate-pulse">Բեռնվում է...</div>
      </div>
    );
  }

  if (!home) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
        <h2 className="text-xl font-bold text-gray-800">Տունը չի գտնվել:</h2>
        <button onClick={() => navigate(-1)} className="rounded-full bg-[#f97316] px-5 py-2 text-white font-medium hover:bg-[#ea580c] transition-colors cursor-pointer">
          Հետ գնալ
        </button>
      </div>
    );
  }

  const currentMonthDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const prevMonthDays = [29, 30];
  const nextMonthDays = [1, 2, 3, 4, 5];
  const propertyImages = home.images || [];

  const position = [home.latitude || 40.1792, home.longitude || 44.4991];

  const openSlider = (index) => {
    setCurrentImgIdx(index);
    setIsSliderOpen(true);
  };

  const nextSlide = () => {
    setCurrentImgIdx((prev) => (prev + 1) % propertyImages.length);
  };

  const prevSlide = () => {
    setCurrentImgIdx((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-12 font-sans text-[#334155]">
    
      
      <div className="mx-auto max-w-[1300px] px-4 pt-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-white rounded-2xl border border-slate-100 p-4 shadow-sm gap-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-base sm:text-lg uppercase tracking-wide break-all">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#f97316]" />
            <span>{home.addres}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex gap-6 flex-wrap">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Արժեք</span>
                <span className="text-base font-extrabold text-[#f97316]">{home.price?.toLocaleString()} ֏</span>
              </div>
              {home.isSleep && (
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Արժեքը գիշերակացով`</span>
                  <span className="text-base font-extrabold text-[#f97316]">{home.sleepPrice?.toLocaleString()} ֏</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200 self-end sm:self-auto">
              <button className="h-7 w-7 rounded-lg bg-slate-900 text-white text-xs font-bold shadow-sm cursor-pointer">֏</button>
              <button className="h-7 w-7 rounded-lg text-slate-500 text-xs font-bold hover:bg-slate-200 cursor-pointer transition-colors">$</button>
              <button className="h-7 w-7 rounded-lg text-slate-500 text-xs font-bold hover:bg-slate-200 cursor-pointer transition-colors">€</button>
              <button className="h-7 w-7 rounded-lg text-slate-500 text-xs font-bold hover:bg-slate-200 cursor-pointer transition-colors">₽</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1300px] px-4 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div 
            onClick={() => openSlider(0)}
            className="md:col-span-6 relative aspect-[4/3] md:h-[440px] overflow-hidden rounded-2xl shadow-sm group cursor-pointer"
          >
            <img src={propertyImages[0]} alt="main-view" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            <button 
              onClick={(e) => e.stopPropagation()} 
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-slate-700 hover:text-red-500 hover:bg-white shadow-md transition-all cursor-pointer"
            >
              <FontAwesomeIcon icon={faHeart} className="text-sm" />
            </button>
          </div>

          <div className="hidden md:col-span-6 md:grid grid-cols-2 gap-3 md:h-[440px]">
            <div onClick={() => openSlider(1)} className="overflow-hidden rounded-2xl shadow-sm h-full cursor-pointer">
              <img src={propertyImages[1] || propertyImages[0]} alt="view-1" className="h-full w-full object-cover hover:opacity-95 transition-opacity duration-300" />
            </div>
            <div onClick={() => openSlider(2)} className="overflow-hidden rounded-2xl shadow-sm h-full cursor-pointer">
              <img src={propertyImages[2] || propertyImages[0]} alt="view-2" className="h-full w-full object-cover hover:opacity-95 transition-opacity duration-300" />
            </div>
            <div onClick={() => openSlider(3)} className="overflow-hidden rounded-2xl shadow-sm h-full cursor-pointer">
              <img src={propertyImages[3] || propertyImages[0]} alt="view-3" className="h-full w-full object-cover hover:opacity-95 transition-opacity duration-300" />
            </div>
            
            <div className="relative overflow-hidden rounded-2xl shadow-sm h-full">
              <img src={propertyImages[4] || propertyImages[0]} alt="view-4" className="h-full w-full object-cover" />
              <button 
                onClick={() => openSlider(4)}
                className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-800 text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-md border border-slate-100 transition-colors cursor-pointer"
              >
                Տեսնել բոլորը
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 grid max-w-[1300px] grid-cols-1 gap-5 px-4 lg:grid-cols-2">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-sm h-fit">
          <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Հայտարարության մասին</h3>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between items-center border-b border-slate-50 pb-1.5 gap-2">
              <span className="text-slate-400"># Կոդ</span>
              <span className="font-semibold text-slate-800 text-right break-all">{id}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-1.5 gap-2">
              <span className="text-slate-400">📍 Հասցե</span>
              <span className="font-semibold text-slate-800 text-right">{home.addres}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
              <span className="text-slate-400">🏠 Գիշերակաց</span>
              <span className="font-semibold text-slate-800">{home.isSleep ? 'Այո' : 'Ոչ'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
              <span className="text-slate-400">📐 Շինության մակերես</span>
              <span className="font-semibold text-slate-800">{home.homeSurface} քմ</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
              <span className="text-slate-400">🗺️ Ընդհանուր մակերես</span>
              <span className="font-semibold text-slate-800">{home.allSurface} քմ</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
              <span className="text-slate-400">👥 Մարդկանց քանակ</span>
              <span className="font-semibold text-slate-800">{home.peopleCaunt || home.peopleCount}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
              <span className="text-slate-400">🛏️ Քանակ գիշերակացով</span>
              <span className="font-semibold text-slate-800">{home.peopleSleepCaunt || 0}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
              <span className="text-slate-400">🚪 Սենյակների քանակ</span>
              <span className="font-semibold text-slate-800">{home.rooms}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
              <span className="text-slate-400">🚽 Սանհանգույցներ</span>
              <span className="font-semibold text-slate-800">{home.tualets}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
              <span className="text-slate-400">🏊 Լողավազան</span>
              <span className="font-semibold text-[#0a84ff]">{home.baseyn}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-sm h-fit">
          <h3 className="text-base font-bold text-slate-800 mb-4">Նշեք Ձեր ցանկալի օրերը</h3>
          <div className="mb-4 rounded-xl bg-gradient-to-r from-[#f97316] to-orange-500 py-2.5 text-center text-sm font-bold text-white tracking-wide">
            ՀՈՒՆԻՍ
          </div>
          <div className="grid grid-cols-7 text-center text-[11px] sm:text-xs font-bold text-slate-400 mb-3">
            <span>երկ</span><span>երք</span><span>չոր</span><span>հին</span><span>ուրբ</span><span>շբթ</span><span className="text-orange-500">կիր</span>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm font-semibold text-slate-700">
            {prevMonthDays.map((day, idx) => (
              <span key={`prev-${idx}`} className="text-slate-300 p-2 sm:p-2.5">{day}</span>
            ))}
            
            {currentMonthDays.map((day) => {
              const isSelected = selectedDate === day;
              return (
                <span 
                  key={`curr-${day}`} 
                  onClick={() => setSelectedDate(day)}
                  className={`p-2 sm:p-2.5 rounded-lg cursor-pointer transition-all duration-150 active:scale-95 select-none text-center
                    ${isSelected 
                      ? 'bg-[#f97316] text-white font-bold shadow-sm shadow-orange-500/20' 
                      : 'hover:bg-orange-50 text-slate-700'
                    }`}
                >
                  {day}
                </span>
              );
            })}
            
            {nextMonthDays.map((day, idx) => (
              <span key={`next-${idx}`} className="text-slate-300 p-2 sm:p-2.5">{day}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-[1300px] px-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-sm flex flex-col gap-6">
          <div>
            <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3">Ընդհանուր Նկարագրություն</h3>
            <p className="text-sm leading-relaxed text-slate-600 font-medium">
              {home.addres}ում օրավարձով է տրվում ընդարձակ և գեղեցիկ տնակ՝ ստեղծված ընտանեկան, ընկերական և կոլեկտիվ միջոցառումների համար։ Տնակը նախատեսված է {home.peopleCaunt || home.peopleCount} անձի համար։
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3">Տնակում առկա է՝</h3>
            {home.advantages && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {home.advantages.map((adv, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xs shrink-0" />
                    <span className="font-medium truncate">{adv}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faMapMarkedAlt} className="text-[#f97316]" />
              Տեղադրությունը քարտեզի վրա
            </h3>
            <div className="w-full h-[280px] sm:h-[350px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative z-10">
              <MapContainer 
                center={position} 
                zoom={14} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker 
                  position={position} 
                  icon={createCustomMarker(home.price, propertyImages[0])}
                >
                  <Popup>
                    <div className="text-xs font-semibold p-1">
                      <p className="font-bold text-[#334155]">{home.addres}</p>
                      <p className="text-[#f97316] mt-1">{home.price?.toLocaleString()} ֏ / օր</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-sm">
            <div>
              <h4 className="font-bold text-slate-800 mb-2">Տնակի 1 օրվա արժեքն է՝</h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Մինչև 20 անձի համար՝ <span className="font-semibold text-slate-800">{home.price?.toLocaleString()} դրամ</span></li>
                {home.sleepPrice && <li>Գիշերակացով արժեքը՝ <span className="font-semibold text-slate-800">{home.sleepPrice?.toLocaleString()} դրամ</span></li>}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-2">Մուտքի և ելքի ժամանակացույց՝</h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Մուտք՝ <span className="font-semibold text-slate-800">14:00</span></li>
                <li>Ելք՝ <span className="font-semibold text-slate-800">12:00</span></li>
              </ul>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-medium pt-2 border-t border-slate-50">
            Ամրագրման կամ այլ մանրամասների համար գրեք կամ զանգահարեք նշված հեռախոսահամարով:
          </div>
        </div>
      </div>

      {isSliderOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 sm:bg-white select-none transition-all duration-300">
          
          <div className="flex items-center justify-between p-4 border-b border-white/10 sm:border-slate-100 bg-black sm:bg-white text-white sm:text-slate-800">
            <span className="text-xs sm:text-sm font-bold opacity-80">
              {currentImgIdx + 1} / {propertyImages.length}
            </span>
            <button 
              onClick={() => setIsSliderOpen(false)}
              className="flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white sm:text-slate-500 sm:hover:text-slate-800 transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">Փակել</span>
              <FontAwesomeIcon icon={faTimes} className="text-lg sm:text-sm" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center bg-black sm:bg-[#fafafa] px-4 sm:px-16">
            
            <button 
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 z-10 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/40 sm:bg-white border border-white/10 sm:border-slate-200 text-white sm:text-slate-600 hover:bg-black/60 sm:hover:bg-slate-50 transition-colors shadow-md cursor-pointer"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-sm sm:text-base" />
            </button>

            <div className="w-full max-w-[95vw] max-h-[60vh] sm:max-h-[70vh] flex justify-center items-center overflow-hidden rounded-xl bg-black">
              <img 
                src={propertyImages[currentImgIdx]} 
                alt={`slider-img-${currentImgIdx}`} 
                className="w-auto h-auto max-w-full max-h-[60vh] sm:max-h-[70vh] object-contain"
              />
            </div>

            <button 
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 z-10 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/40 sm:bg-white border border-white/10 sm:border-slate-200 text-white sm:text-slate-600 hover:bg-black/60 sm:hover:bg-slate-50 transition-colors shadow-md cursor-pointer"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-sm sm:text-base" />
            </button>
          </div>

          <div className="bg-black sm:bg-white border-t border-white/10 sm:border-slate-100 p-4 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2 justify-start sm:justify-center">
            {propertyImages.map((img, index) => {
              const isActive = currentImgIdx === index;
              return (
                <div 
                  key={index}
                  onClick={() => setCurrentImgIdx(index)}
                  className={`inline-block h-12 w-20 sm:h-16 sm:w-24 shrink-0 rounded-lg overflow-hidden border-2 bg-slate-900 cursor-pointer transition-all
                    ${isActive ? 'border-[#f97316] scale-[1.03] shadow-md' : 'border-transparent opacity-40 hover:opacity-90'}`}
                >
                  <img src={img} alt={`thumb-${index}`} className="h-full w-full object-cover" />
                </div>
              );
            })}
          </div>
        </div>
      )}
  
    </div>
  );
}