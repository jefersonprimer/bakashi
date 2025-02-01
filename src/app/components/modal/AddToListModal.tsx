import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useLists } from '../../contexts/ListsContext';
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
    setNewListName(''); 
  };

  const handleAddToList = (listId: string) => {
    addItemToList(listId, anime);
  };

  const handleRemoveFromList = (listId: string) => {
    removeItemFromList(listId, anime.id);
  };

  // Função para verificar se o anime já está na lista
  const isAnimeInList = (listId: string) => {
    const list = lists.find((list) => list.id === listId);
    return list?.items.some((item) => item.id === anime.id) ?? false;
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h3 className={styles.title}>Adicionar à Crunchylista</h3>

        <div className={styles.listsContainer}>
          <div className={styles.createListContainer}>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Nome da nova lista"
              className={styles.createListInput}
            />

            <div className={styles.header}>
              <span>{lists.length}/10 listas</span>
              <button onClick={handleCreateList} className={styles.btnCreate}>CRIAR NOVA LISTA</button>
            </div>
          </div>

          {lists.map((list) => (
            <div key={list.id} className={styles.listItem}>
              <div className={styles.textListItem}>
                <p>{list.name}</p>
                <span>{list.items.length} itens</span>
              </div>
              <button
                onClick={() => 
                  isAnimeInList(list.id)
                    ? handleRemoveFromList(list.id)
                    : handleAddToList(list.id)
                }
                className={styles.btnRemoveOrAdd}
              >
                {isAnimeInList(list.id) ? '-' : '+'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default AddToListModal;
