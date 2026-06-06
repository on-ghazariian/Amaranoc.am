import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // Ներմուծում ենք persist-ը

export const useFavoritesStore = create(
  persist(
    (set) => ({
      likedHomes: [],
      
      // Ֆունկցիա, որը կա՛մ ավելացնում է, կա՛մ հեռացնում տունը ցուցակից
      toggleFavorite: (home) => set((state) => {
        const isExist = state.likedHomes.some(item => item.id === home.id);
        if (isExist) {
          return { likedHomes: state.likedHomes.filter(item => item.id !== home.id) };
        } else {
          return { likedHomes: [...state.likedHomes, home] };
        }
      }),
    }),
    {
      name: 'favorites-storage', // Սա localStorage-ի մեջի key-ի անունն է
    }
  )
);