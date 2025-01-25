"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Anime } from "@/types/anime";

interface AnimeListContextType {
  watchlist: Anime[];
  addToWatchlist: (anime: Anime) => void;
  removeFromWatchlist: (id: string) => void;
}

const AnimeListContext = createContext<AnimeListContextType | undefined>(undefined);

export const AnimeListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<Anime[]>([]);

  const addToWatchlist = (anime: Anime) => {
    setWatchlist((prev) => [...prev, anime]);
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist((prev) => prev.filter((anime) => anime.id !== id));
  };

  return (
    <AnimeListContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </AnimeListContext.Provider>
  );
};

export const useAnimeList = (): AnimeListContextType => {
  const context = useContext(AnimeListContext);
  if (!context) {
    throw new Error("useAnimeList must be used within an AnimeListProvider");
  }
  return context;
};
