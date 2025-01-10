// 'use client';

// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { Anime } from '../../types';

// interface AnimeContextType {
//   watchlist: Anime[];
//   primerlist: Anime[];
//   addToWatchlist: (anime: Anime) => void;
//   addToPrimerlist: (anime: Anime) => void;
// }

// const AnimeContext = createContext<AnimeContextType | undefined>(undefined);

// export const AnimeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [watchlist, setWatchlist] = useState<Anime[]>([]);
//   const [primerlist, setPrimerlist] = useState<Anime[]>([]);

//   const addToWatchlist = (anime: Anime) => {
//     setWatchlist((prev) => [...prev, anime]);
//   };

//   const addToPrimerlist = (anime: Anime) => {
//     setPrimerlist((prev) => [...prev, anime]);
//   };

//   return (
//     <AnimeContext.Provider value={{ watchlist, primerlist, addToWatchlist, addToPrimerlist }}>
//       {children}
//     </AnimeContext.Provider>
//   );
// };

// export const useAnimeContext = () => {
//   const context = useContext(AnimeContext);
//   if (!context) {
//     throw new Error('useAnimeContext must be used within a AnimeContextProvider');
//   }
//   return context;
// };
