import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../../lib/firebase";
import CategorySlider from "./category";
import HomeCard from "./homeCard";

export default function Home() {
  const [db, setDb] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHomes = db.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(db.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <CategorySlider />

      <div className="my-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#0f172a]">
          Սովորական առաջարկներ
        </h2>
        <div className="flex gap-1.5 shrink-0 justify-end">
          <div className="flex cursor-pointer items-center gap-[3px] rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1.5 active:bg-gray-50 transition-colors">
            <span className="h-1.5 w-2.5 rounded-[1px] border-2 border-[#94a3b8]"></span>
            <span className="h-1.5 w-2.5 rounded-[1px] border-2 border-[#94a3b8]"></span>
          </div>
          <div className="flex cursor-pointer items-center gap-[3px] rounded-lg border border-[#0f172a] bg-[#0f172a] px-2.5 py-1.5 active:opacity-90 transition-opacity">
            <span className="h-2.5 w-[3px] bg-white"></span>
            <span className="h-2.5 w-[3px] bg-white"></span>
            <span className="h-2.5 w-[3px] bg-white"></span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500 font-medium text-sm sm:text-base animate-pulse">
          Բեռնվում է...
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
            {currentHomes.map((home, index) => (
              <HomeCard key={home.id} home={home} index={index} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10 mb-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                ❮
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    currentPage === page
                      ? "bg-[#0f172a] text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-medium bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                ❯
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}