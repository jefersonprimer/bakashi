'use client';

import React, { useState } from 'react';
import { useLists } from '../contexts/ListsContext';
import AddToListModal from '../components/AddToListModal';
 import { useRouter } from 'next/navigation'; // Importa o hook useRouter

import styles from './CrunchyList.module.css';

const CrunchyList = () => {
  const { lists, addItemToList, removeItemFromList, removeList, updateListName } = useLists();
  const [showModal, setShowModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [expandedList, setExpandedList] = useState(null);
  const [editingListId, setEditingListId] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [visibleMenu, setVisibleMenu] = useState(null);
  const { createList } = useLists();
 

  const router = useRouter(); // Inicializa o roteador do Next.js

  const handleNavigateToList = (listId) => {
    router.push(`/crunchylists/${listId}`); // Redireciona para a página detalhada
  };


  const handleAddItem = (anime) => {
    setSelectedAnime(anime);
    setShowModal(true);
  };

  const handleRemoveItem = (listId, itemId) => {
    removeItemFromList(listId, itemId);
  };

  const handleDeleteList = (listId) => {
    removeList(listId);
  };

  const handleToggleExpand = (listId) => {
    setExpandedList(expandedList === listId ? null : listId);
  };

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('pt-BR', options);
  };

  const handleRenameList = (listId, currentName) => {
    setEditingListId(listId);
    setNewListName(currentName);
  };

  const handleSaveNewName = (listId) => {
    updateListName(listId, newListName);
    setEditingListId(null);
  };

  

  const handleCreateList = () => {
    if (lists.length < 10) {
      createList(`Minha Lista ${lists.length + 1}`);
    } else {
      alert("Você atingiu o limite de 10 listas.");
    }
  };

  

  return (
    <div className={styles.crunchyListContainer}>
      <div className={styles.header}>
        <button onClick={handleCreateList} className={styles.createListBtn}>CRIAR NOVA LISTA</button>
        <span className={styles.listLength}>{lists.length}/10 listas</span>
      </div>

      <div className={styles.listsContainer}>
        {lists.length === 0 ? (
          <p>Não há listas criadas ainda.</p>
        ) : (
          lists.map((list) => (
            <div key={list.id} className={styles.listItem}>
              {editingListId === list.id ? (
                <div className={styles.renameListContainer}>
                  <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    className={styles.renameInput}
                  />
                  <button
                    className={styles.saveRenameButton}
                    onClick={() => handleSaveNewName(list.id)}
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <h3
                  className={styles.listTitle}
                  onClick={() => handleNavigateToList(list.id)} 

                >
                  {list.name}
                </h3>
              )}

              <div className={styles.listInfo}>
                <p>{`${list.items.length} Itens`}</p>
                <p className={styles.updatedAt}>
                  - Atualizada em {formatDate(list.updatedAt)}
                </p>
              </div>

              {expandedList === list.id && (
                <div className={styles.listItems}>
                  {list.items.length === 0 ? (
                    <p>Sem itens na lista.</p>
                  ) : (
                    list.items.map((anime) => (
                      <div key={anime.id} className={styles.animeItem}>
                        <img src={anime.image} alt={anime.name} className={styles.animeImage} />
                        <span>{anime.name}</span>
                        <button
                          className={styles.removeButton}
                          onClick={() => handleRemoveItem(list.id, anime.id)}
                        >
                          Remover
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              <div className={styles.menuContainer}>
                <button
                  className={styles.menuIcon}
                  onClick={() =>
                    setVisibleMenu(visibleMenu === list.id ? null : list.id)
                  }
                >
                  &#x22EE;
                </button>

                {visibleMenu === list.id && (
                  <div className={styles.dropdownMenu}>
                    <button
                      onClick={() => handleRenameList(list.id, list.name)}
                      className={styles.dropdownItem}
                    >
                      Renomear
                    </button>
                    <button
                      onClick={() => handleDeleteList(list.id)}
                      className={styles.dropdownItem}
                    >
                      Excluir Lista
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && selectedAnime && (
        <AddToListModal
          anime={selectedAnime}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CrunchyList;
