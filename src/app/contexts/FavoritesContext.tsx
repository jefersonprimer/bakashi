'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Favorite {
  id: string;
  name: string;
  image: string;
  audioType: string;
}

interface FavoritesContextType {
  favorites: Favorite[];
  addFavorite: (anime: Favorite) => void;
  removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  // Carregar favoritos do localStorage quando o componente for montado
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Salvar ou limpar favoritos no localStorage sempre que a lista mudar
  useEffect(() => {
    if (favorites.length > 0) {
      // Salva os favoritos no localStorage
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
      // Limpa os favoritos no localStorage se a lista estiver vazia
      localStorage.removeItem('favorites');
    }
  }, [favorites]);

  const addFavorite = (anime: Favorite) => {
    setFavorites((prevFavorites) => {
      // Verifica se a lista já tem 100 itens
      if (prevFavorites.length >= 100) {
        alert('Você atingiu o limite máximo de 100 favoritos.');
        return prevFavorites; // Retorna a lista sem alterações
      }
  
      // Adiciona o novo favorito à lista
      const updatedFavorites = [...prevFavorites, anime];
      return updatedFavorites;
    });
  };  

  const removeFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(favorite => favorite.id !== id);
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
