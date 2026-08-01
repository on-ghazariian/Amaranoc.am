import React, { useState, useEffect } from "react";
import CategorySlider from "./category";
import HomeCard from "./homeCard";
import { useSearchStore } from "../../../store/useSearchStore";
import { auth } from "../../../lib/firebase";

export default function Home({ activeFilters, initialDb = [], isDbLoading }) {
  const [filteredDb, setFilteredDb] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPhoto, setUserPhoto] = useState(null);
  const itemsPerPage = 12;

  const searchQuery = useSearchStore((state) => state.searchQuery);

  // Google Provider-ից նկարը ճշգրիտ ստանալու տրամաբանությունը
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Ստուգում ենք թե՛ direct photoURL-ը, թե՛ Google provider-ի photoURL-ը
        const googlePhoto = user.photoURL || user.providerData?.[0]?.photoURL;
        setUserPhoto(googlePhoto || null);
      } else {
        setUserPhoto(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (initialDb.length === 0) {
      setFilteredDb([]);
      return;
    }

    let result = [...initialDb];

    // ՈՐՈՆՄԱՆ ՖԻԼՏՐ
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(item => {
        const addressMatch = item.addres && item.addres.toLowerCase().includes(query);
        const idMatch = item.id && item.id.toLowerCase().includes(query);
        return addressMatch || idMatch;
      });
    }

    // Կատեգորիայի Ֆիլտր
    if (selectedCategory) {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Կողային Ֆիլտրեր
    if (activeFilters) {
      if (activeFilters.regions.length > 0) {
        result = result.filter(item => activeFilters.regions.includes(item.addres));
      }

      result = result.filter(item => {
        const priceToCompare = activeFilters.isSleep === 'Այո' && item.sleepPrice ? item.sleepPrice : item.price;
        return priceToCompare >= activeFilters.minPrice && priceToCompare <= activeFilters.maxPrice;
      });

      result = result.filter(item => (item.peopleCaunt || item.peopleCount || 0) >= activeFilters.peopleCount);

      if (activeFilters.isSleep !== 'Բոլորը') {
        const targetSleep = activeFilters.isSleep === 'Այո';
        result = result.filter(item => item.isSleep === targetSleep);
      }

      result = result.filter(item => (item.peopleSleepCaunt || 0) >= activeFilters.peopleSleepCount);

      if (activeFilters.rooms !== 'Բոլորը') {
        if (activeFilters.rooms === '6 և ավելի') {
          result = result.filter(item => item.rooms >= 6);
        } else {
          result = result.filter(item => item.rooms === parseInt(activeFilters.rooms));
        }
      }

      if (activeFilters.tualets !== 'Բոլորը') {
        if (activeFilters.tualets === '3+') {
          result = result.filter(item => item.tualets >= 3);
        } else {
          result = result.filter(item => item.tualets === parseInt(activeFilters.tualets));
        }
      }

      if (activeFilters.baseyn !== 'Բոլորը') {
        if (activeFilters.baseyn === 'Առանց լողավազանի') {
          result = result.filter(item => !item.baseyn || item.baseyn.trim() === '');
        } else {
          result = result.filter(item => item.baseyn && item.baseyn.includes(activeFilters.baseyn));
        }
      }

      if (activeFilters.advantages.length > 0) {
        result = result.filter(item => 
          item.advantages && activeFilters.advantages.every(adv => item.advantages.includes(adv))
        );
      }
    }

    setFilteredDb(result);
    setCurrentPage(1);
  }, [activeFilters, initialDb, selectedCategory, searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHomes = filteredDb.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDb.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <CategorySlider 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />

      <div className="my-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#0f172a]">
          Սովորական առաջարկներ ({filteredDb.length})
        </h2>

        {/* Իկոնաներ և Google User Avatar-ը */}
        <div className="flex items-center gap-3 shrink-0 justify-end">


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

      {isDbLoading ? (
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

          {filteredDb.length === 0 && (
            <div className="text-center py-12 text-gray-400 font-medium text-sm">
              {searchQuery ? `«${searchQuery}» որոնմամբ տնակ չի գտնվել։` : 'Համապատասխան տնակ չի գտնվել։'}
            </div>
          )}

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