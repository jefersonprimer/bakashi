import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useLists } from '../contexts/ListsContext';
import { Anime } from '@/types/anime';
import styles from './AddToListModal.module.css';

interface AddToListModalProps {
  anime: Anime;
  onClose: () => void;
}

const AddToListModal: React.FC<AddToListModalProps> = ({ anime, onClose }) => {
  const { lists, addItemToList, removeItemFromList, createList } = useLists();
  const [newListName, setNewListName] = useState('');

  const handleCreateList = () => {
    createList(newListName);
    setNewListName(''); // Limpa o campo de nome da nova lista após criação
  };

  const handleAddToList = (listId: string) => {
    addItemToList(listId, anime);
    // Não fecha o modal automaticamente aqui
  };

  const handleRemoveFromList = (listId: string) => {
    removeItemFromList(listId, anime.id); // Remove o anime da lista
    // Não fecha o modal automaticamente aqui
  };

  // Função para verificar se o anime já está na lista
  const isAnimeInList = (listId: string) => {
    const list = lists.find((list) => list.id === listId);
    return list?.items.some((item) => item.id === anime.id) ?? false;
  };

  // Função para fechar o modal quando o usuário clicar fora da área do conteúdo
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Se o clique ocorrer fora do modal (overlay), fecha o modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h3>Adicionar à Crunchylista</h3>

        <div className={styles.listsContainer}>
          <div className={styles.createListContainer}>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Nome da nova lista"
            />
            <button onClick={handleCreateList}>Criar Nova Lista</button>
          </div>

          {lists.map((list) => (
            <div key={list.id} className={styles.listItem}>
              <p>{list.name}</p>
              {/* Exibe "Remover" caso o anime já esteja na lista, caso contrário, exibe "Adicionar" */}
              <button
                onClick={() => 
                  isAnimeInList(list.id)
                    ? handleRemoveFromList(list.id) // Remove o anime da lista
                    : handleAddToList(list.id) // Adiciona o anime à lista
                }
              >
                {isAnimeInList(list.id) ? 'Remover' : 'Adicionar'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Usa um portal para renderizar o modal no `document.body`
  return ReactDOM.createPortal(modalContent, document.body);
};

export default AddToListModal;
