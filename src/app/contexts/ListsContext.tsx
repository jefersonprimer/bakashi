'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Anime } from '@/types/anime';

interface List {
  id: string;
  name: string;
  items: Anime[];
  updatedAt: string; // Mantém o updatedAt para a data de atualização
}

interface ListsContextType {
  lists: List[];
  createList: (name: string) => void;
  addItemToList: (listId: string, anime: Anime) => void;
  removeItemFromList: (listId: string, animeId: string) => void;
  removeList: (listId: string) => void;
  updateListName: (listId: string, newName: string) => void; // Adiciona a função para atualizar o nome da lista
}

const ListsContext = createContext<ListsContextType | undefined>(undefined);

interface ListsProviderProps {
  children: ReactNode;
}

export const ListsProvider: React.FC<ListsProviderProps> = ({ children }) => {
  const [lists, setLists] = useState<List[]>([]);

  // Carregar listas do localStorage quando o componente for montado
  useEffect(() => {
    const storedLists = localStorage.getItem('crunchylists');
    if (storedLists) {
      setLists(JSON.parse(storedLists));
    }
  }, []);

  // Salvar listas no localStorage sempre que a lista mudar
  useEffect(() => {
    if (lists.length > 0) {
      localStorage.setItem('crunchylists', JSON.stringify(lists));
    } else {
      // Caso não haja nenhuma lista, limpamos o localStorage
      localStorage.removeItem('crunchylists');
    }
  }, [lists]);

  const createList = (name: string) => {
    if (lists.length >= 10) {
      alert('Você atingiu o limite máximo de 10 listas.');
      return;
    }
  
    if (name.trim().length === 0) {
      name = 'Untitled List'; // Nome padrão se estiver vazio
    }
  
    const newList: List = {
      id: Date.now().toString(),
      name,
      items: [],
      updatedAt: new Date().toISOString(),
    };
    
    setLists((prevLists) => [...prevLists, newList]);
  };  

  const addItemToList = (listId: string, anime: Anime) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === listId) {
          // Verifica se a lista já tem 100 itens
          if (list.items.length >= 100) {
            alert('Esta lista atingiu o limite máximo de 100 itens.');
            return list;
          }
  
          // Verifica se o item já existe na lista
          const alreadyExists = list.items.some((item) => item.id === anime.id);
          if (alreadyExists) {
            return list;
          }
  
          // Adiciona o anime à lista e atualiza a data
          return {
            ...list,
            items: [...list.items, anime],
            updatedAt: new Date().toISOString(),
          };
        }
        return list;
      })
    );
  };
  

  // Função para remover um item da lista
  const removeItemFromList = (listId: string, animeId: string) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.filter((item) => item.id !== animeId),
              updatedAt: new Date().toISOString(), // Atualiza a data
            }
          : list
      )
    );
  };

  // Função para remover uma lista
  const removeList = (listId: string) => {
    setLists((prevLists) => {
      const updatedLists = prevLists.filter((list) => list.id !== listId);
      localStorage.setItem('crunchylists', JSON.stringify(updatedLists)); // Atualiza o localStorage
      return updatedLists;
    });
  };

  // Função para atualizar o nome da lista
  const updateListName = (listId: string, newName: string) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, name: newName, updatedAt: new Date().toISOString() } // Atualiza o nome e a data
          : list
      )
    );
  };

  return (
    <ListsContext.Provider value={{ lists, createList, addItemToList, removeItemFromList, removeList, updateListName }}>
      {children}
    </ListsContext.Provider>
  );
};

export const useLists = (): ListsContextType => {
  const context = useContext(ListsContext);
  if (!context) {
    throw new Error('useLists must be used within a ListsProvider');
  }
  return context;
};
