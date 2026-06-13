import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import {app} from "../../../lib/firebase";
import CategorySlider from "./category";
import HomeCard from "./homeCard";

export default function Home() {
  const [db, setDb] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const database = getDatabase(app);
    const listingsRef = ref(database, "listings");

    get(listingsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedData = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setDb(formattedData);
        } else {
          console.log("No data available at this path.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data from Firebase:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full">
      <CategorySlider />

      <div className="my-5 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#0f172a]">Սովորական առաջարկներ</h2>
        <div className="flex gap-1.5">
          <div className="flex cursor-pointer items-center gap-[3px] rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1.5">
            <span className="h-1.5 w-2.5 rounded-[1px] border-2 border-[#94a3b8]"></span>
            <span className="h-1.5 w-2.5 rounded-[1px] border-2 border-[#94a3b8]"></span>
          </div>
          <div className="flex cursor-pointer items-center gap-[3px] rounded-lg border border-[#0f172a] bg-[#0f172a] px-2.5 py-1.5">
            <span className="h-2.5 w-[3px] bg-white"></span>
            <span className="h-2.5 w-[3px] bg-white"></span>
            <span className="h-2.5 w-[3px] bg-white"></span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500 font-medium">Բեռնվում է...</div>
      ) : (
        <div 
          className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        >
          {db.map((home, index) => (
             <HomeCard key={home.id} home={home} index={index}/>
          ))}
        </div>
      )}
    </div>
  );
}