import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import {app} from "../../lib/firebase";

export default function ServiceGrid() {
  const [servicesDb, setServicesDb] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const database = getDatabase(app);
    const servicesRef = ref(database, "services");

    get(servicesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedData = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setServicesDb(formattedData);
        } else {
          console.log("No data available at this path.");
        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full text-center py-20 text-slate-500 font-medium">
        Բեռնվում է...
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 bg-white font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {servicesDb.map((service) => (
          <div 
            key={service.id} 
            className="flex flex-col w-full max-w-[380px] bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-3px_rgba(0,0,0,0.08)] border border-slate-100 transition-all duration-300 hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.12)]"
          >
            <div className="h-[240px] w-full overflow-hidden bg-slate-100">
              <img 
                src={service.img} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between gap-5">
              <div>
                <h3 className="text-lg font-bold text-[#1a2530] mb-2.5 cursor-pointer hover:text-[#ff8c00] transition-colors">
                  {service.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#5e6c7a] line-clamp-4">
                  {service.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-[#1a2530] font-bold text-base">
                  <i className="fa-regular fa-clock text-sm text-[#ff8c00]"></i>
                  <span>{Number(service.price).toLocaleString()} ֏</span>
                </div>

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