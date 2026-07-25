import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMap, faCalendarAlt, faChevronLeft, faChevronRight,
  faHome, faCampground, faSwimmingPool, faTree, faMountain, faFire, faHotel, faXmark
} from '@fortawesome/free-solid-svg-icons';

import 'swiper/css';
import 'swiper/css/navigation';

// 🗺️ Leaflet CSS & React-Leaflet Hooks
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// 📍 Firebase
import { db, auth } from "../../../lib/firebase";
import { ref, update, onValue } from 'firebase/database';

// 🎯 Helper Component to dynamically re-center map when locations update
function MapViewController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.panTo(center, { animate: true, duration: 1 });
    }
  }, [center, map]);
  return null;
}

// 🖼️ Custom HTML Avatar Marker with Smooth Transition CSS
const createUserIcon = (photoUrl, displayName) => {
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName || 'User')}&background=0D8ABC&color=fff`;
  const finalPhoto = photoUrl || fallbackAvatar;

  return L.divIcon({
    className: 'custom-live-avatar-marker',
    html: `
      <div style="
        position: relative;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        border: 3px solid #10B981;
        background-color: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.35);
        transition: transform 0.8s linear;
      ">
        <img src="${finalPhoto}" 
             alt="avatar" 
             style="
               width: 100%;
               height: 100%;
               border-radius: 50%;
               object-fit: cover;
             " 
             onerror="this.src='${fallbackAvatar}'"
        />
        <span style="
          position: absolute;
          bottom: 0px;
          right: 0px;
          width: 12px;
          height: 12px;
          background-color: #10B981;
          border: 2px solid white;
          border-radius: 50%;
        "></span>
      </div>
    `,
    iconSize: [46, 46],
    iconAnchor: [23, 23],
    popupAnchor: [0, -23]
  });
};

const defaultCenter = [40.1792, 44.4991];

export default function CategorySlider({ selectedCategory, onCategoryChange }) {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [currentCoords, setCurrentCoords] = useState(null);

  // 1️⃣ High-Accuracy Continuous Geolocation Tracking
  useEffect(() => {
    let watchId = null;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const user = auth.currentUser;

          setCurrentCoords([latitude, longitude]);

          if (user) {
            const userRef = ref(db, `users/${user.uid}`);
            update(userRef, {
              location: {
                lat: latitude,
                lng: longitude,
                updatedAt: Date.now()
              },
              displayName: user.displayName || 'User',
              photoURL: user.photoURL || '',
              isOnline: true
            });
          }
        },
        (error) => console.error("Live Geolocation error:", error),
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      );
    }

    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // 2️⃣ Firebase Realtime Synchronization
  useEffect(() => {
    if (!isMapOpen) return;

    const usersRef = ref(db, 'users');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const onlineUsers = Object.entries(data)
          .map(([uid, u]) => ({ uid, ...u }))
          .filter((u) => u.isOnline && u.location?.lat && u.location?.lng);
        setActiveUsers(onlineUsers);
      } else {
        setActiveUsers([]);
      }
    });

    return () => unsubscribe();
  }, [isMapOpen]);

  const categories = [
    { id: 1, label: 'Ամառանոցներ', key: 'mansion', icon: faHome },
    { id: 2, label: 'Frame houses', key: 'frame houses', icon: faCampground },
    { id: 3, label: 'Տնակներ', key: 'homes', icon: faHome },
    { id: 4, label: 'Փակ լողավազան', key: 'swimming pool', icon: faSwimmingPool },
    { id: 5, label: 'Աղմուկից հեռու', key: 'silent', icon: faTree },
    { id: 6, label: 'Շքեղ տեսարան', key: 'magnificent view', icon: faMountain },
    { id: 7, label: 'Պահանջված', key: 'required', icon: faFire },
    { id: 8, label: 'Հյուրանոցներ', key: 'hotels', icon: faHotel },
  ];

  const handleCategoryClick = (key) => {
    if (selectedCategory === key) {
      onCategoryChange(null);
    } else {
      onCategoryChange(key);
    }
  };

  const mapCenter = currentCoords 
    ? currentCoords 
    : (activeUsers.length > 0 ? [activeUsers[0].location.lat, activeUsers[0].location.lng] : defaultCenter);

  return (
    <div className="w-full select-none bg-white relative">
      
      {/* Dynamic CSS for smooth Leaflet Marker movement */}
      <style>{`
        .custom-live-avatar-marker {
          transition: transform 0.8s linear !important;
        }
      `}</style>

      {/* 🗺️ LIVE LOCATION MAP MODAL */}
      {isMapOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-sm">
          <div className="relative flex h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 py-4 bg-white z-10">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
                <FontAwesomeIcon icon={faMap} className="text-[#0b93f6]" />
                Live Tracking Map ({activeUsers.length})
              </h3>
              <button 
                onClick={() => setIsMapOpen(false)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 active:scale-95"
              >
                <FontAwesomeIcon icon={faXmark} className="text-lg" />
              </button>
            </div>

            {/* Map Container */}
            <div className="h-full w-full bg-gray-100 relative z-0">
              <MapContainer 
                center={mapCenter} 
                zoom={16} 
                scrollWheelZoom={true} 
                style={{ width: '100%', height: '100%' }}
              >
                <MapViewController center={mapCenter} />

                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Live markers */}
                {activeUsers.map((u) => (
                  <Marker 
                    key={u.uid} 
                    position={[u.location.lat, u.location.lng]}
                    icon={createUserIcon(u.photoURL, u.displayName)}
                  >
                    <Popup>
                      <div className="flex items-center gap-2 p-1 font-sans">
                        <img 
                          src={u.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.displayName || 'U')}`} 
                          alt="avatar" 
                          className="w-9 h-9 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <p className="font-bold text-xs m-0 text-gray-800">{u.displayName}</p>
                          <p className="text-[10px] text-green-600 font-semibold m-0 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-ping"></span>
                            Live Moving
                          </p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

          </div>
        </div>
      )}

      {/* Top buttons */}
      <div className="mb-4 flex items-center justify-between sm:justify-start gap-3 py-1">
        <button 
          onClick={() => setIsMapOpen(true)}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-[30px] border border-black bg-white px-4 py-2 sm:px-[22px] text-xs sm:text-sm font-semibold text-black active:bg-gray-50 transition-colors"
        >
          <span>Քարտեզ</span>
          <FontAwesomeIcon icon={faMap} />
        </button>

        <button className="flex h-9 w-9 sm:h-[38px] sm:w-[38px] cursor-pointer items-center justify-center rounded-full border border-[#cbd5e1] bg-white text-[#475569] active:bg-gray-50 transition-colors">
          <FontAwesomeIcon icon={faCalendarAlt} />
        </button>
      </div>

      <hr className="m-0 border-0 border-t border-[#f1f5f9]" />

      {/* Swiper Slider */}
      <div className="relative my-3 flex items-center px-0 md:px-9">
        <button 
          id="cat-prev" 
          className="absolute left-0 z-10 hidden md:flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#cbd5e1] bg-white text-[#475569] shadow-[0_2px_4px_rgba(0,0,0,0.06)] [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-0 transition-opacity duration-200"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: '#cat-prev', nextEl: '#cat-next' }}
          spaceBetween={16}
          slidesPerView="auto"
          breakpoints={{
            480: { spaceBetween: 20 },
            768: { spaceBetween: 24 },
            1024: { spaceBetween: 28 }
          }}
          className="w-full"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <SwiperSlide key={cat.id} style={{ width: 'auto' }}>
                <div 
                  onClick={() => handleCategoryClick(cat.key)}
                  className={`group flex cursor-pointer flex-col items-center gap-1.5 sm:gap-2 border-b-2 pb-2 transition-all duration-200 ${
                    isActive 
                      ? 'border-black text-black font-semibold' 
                      : 'border-transparent text-[#64748b] hover:border-black hover:text-black'
                  }`}
                >
                  <FontAwesomeIcon icon={cat.icon} className="text-base sm:text-lg md:text-xl" />
                  <span className="text-[11px] sm:text-[12px] font-medium whitespace-nowrap">{cat.label}</span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button 
          id="cat-next" 
          className="absolute right-0 z-10 hidden md:flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#cbd5e1] bg-white text-[#475569] shadow-[0_2px_4px_rgba(0,0,0,0.06)] [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-0 transition-opacity duration-200"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      
      <hr className="m-0 border-0 border-t border-[#f1f5f9]" />
    </div>
  );
}