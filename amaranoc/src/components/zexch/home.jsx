import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../lib/firebase";
import HomeCard from "../main/homes/homeCard";

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

      {loading ? (
        <div className="text-center py-12 text-gray-500 font-medium text-sm sm:text-base animate-pulse">
          Բեռնվում է...
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {db.map((home, index) => (
             <HomeCard key={home.id} home={home} index={index}/>
          ))}
        </div>
      )}
    </div>
  );
}   