import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../lib/firebase";
import Filter from "./filter/filter";
import Home from "./homes/home";

export function Main() {
  const [db, setDb] = useState([]);
  const [activeFilters, setActiveFilters] = useState(null);
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
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="w-full bg-gray-50/50">
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 md:px-10 md:py-10 lg:px-[70px] flex flex-col xl:flex-row gap-6 md:gap-8 lg:gap-[50px] items-start">
        <Filter onFilterChange={setActiveFilters} db={db} />
        <Home activeFilters={activeFilters} initialDb={db} isDbLoading={loading} />
      </div>
    </main>
  );
}