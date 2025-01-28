// contexts/HistoryContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Episode } from '@/types/episode'; // Tipo de episódio

interface HistoryContextType {
  history: Episode[];
  addEpisode: (episode: Episode) => void;
  removeEpisode: (episodeId: string) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState<Episode[]>([]);

  // Carregar o histórico do localStorage ao montar o componente
  useEffect(() => {
    const storedHistory = localStorage.getItem('history');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Salvar o histórico no localStorage sempre que a lista mudar
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('history', JSON.stringify(history));
    }
  }, [history]);

  const addEpisode = (episode: Episode) => {
    setHistory((prevHistory) => [...prevHistory, episode]);
  };

  const removeEpisode = (episodeId: string) => {
    setHistory((prevHistory) => prevHistory.filter((episode) => episode.id !== episodeId));
  };

  return (
    <HistoryContext.Provider value={{ history, addEpisode, removeEpisode }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = (): HistoryContextType => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
