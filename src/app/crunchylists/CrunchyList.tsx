'use client';

import styles from './CrunchyList.module.css';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useLists } from '../contexts/ListsContext';

import AddToListModal from '../components/modal/AddToListModal';

// Componente Modal para renomear a lista
const RenameListModal = ({
  currentName,
  onSave,
  onClose
}: {
  currentName: string;
  onSave: (newName: string) => void;  // Passando a função para salvar o novo nome
  onClose: () => void;
}) => {
  const [newListName, setNewListName] = useState(currentName);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Renomear Crunchylista</h2>
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className={styles.renameInput}
        />
        <div>
          <button
             className={styles.saveRenameButton}
             onClick={() => onSave(newListName)}  // Passa o novo nome para o onSave
          >
            RENOMEAR LISTA
          </button>
          <button
            className={styles.cancelButton}
            onClick={onClose} // Fecha o modal sem salvar
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
};

const CrunchyList = () => {
  const { lists, addItemToList, removeItemFromList, removeList, updateListName, createList } = useLists();
  const [showModal, setShowModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [expandedList, setExpandedList] = useState(null);
  const [editingListId, setEditingListId] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [visibleMenu, setVisibleMenu] = useState(null);

  const router = useRouter(); // Inicializa o roteador do Next.js

  const handleNavigateToList = (listId) => {
    router.push(`/crunchylists/${listId}`); // Redireciona para a página detalhada
  };

  const handleRemoveItem = (listId, itemId) => {
    removeItemFromList(listId, itemId);
  };

  const handleDeleteList = (listId) => {
    removeList(listId);
    setEditingListId(null); // Fecha o modal quando a lista for excluída
  };

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('pt-BR', options);
  };

  const handleRenameList = (listId, currentName) => {
    setEditingListId(listId);
    setNewListName(currentName);
  };

  const handleSaveNewName = (newName: string) => {
    if (editingListId) {
      updateListName(editingListId, newName);
      setEditingListId(null); // Fecha o modal após salvar o novo nome
    }
  };

  const handleCreateList = () => {
    if (lists.length < 10) {
      createList(`Minha Lista ${lists.length + 1}`);
    } else {
      alert('Você atingiu o limite de 10 listas.');
    }
  };

  return (
    <div className={styles.crunchyListContainer}>
      <div className={styles.header}>
        <button onClick={handleCreateList} className={styles.createListBtn}>
          CRIAR NOVA LISTA
        </button>
        <span className={styles.listLength}>{lists.length}/10 listas</span>
      </div>

      <div className={styles.listsContainer}>
        {lists.length === 0 ? (
          <p>Não há listas criadas ainda.</p>
        ) : (
          lists.map((list) => (
            <div key={list.id} className={styles.listItem}>
              <div className={styles.listTitleContainer}>
                <h3
                  className={styles.listTitle}
                  onClick={() => handleNavigateToList(list.id)}
                >
                  {list.name}
                </h3>
              </div>

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
                        <img
                          src={anime.image}
                          alt={anime.name}
                          className={styles.animeImage}
                        />
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
                  onClick={() => setVisibleMenu(visibleMenu === list.id ? null : list.id)}
                >
                  &#x22EE;
                </button>

                {visibleMenu === list.id && (
                  <div className={styles.dropdownMenu}>
                    <button
                      onClick={() => {
                        handleRenameList(list.id, list.name);  // Abre o modal de renomear
                        setVisibleMenu(null);  // Fecha o menu
                      }}
                      className={styles.dropdownItem}
                    >
                      Renomear
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteList(list.id);  // Exclui a lista
                        setVisibleMenu(null);  // Fecha o menu
                      }}
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

      {/* Modal para Renomear Lista */}
      {editingListId && (
        <RenameListModal
          currentName={newListName}
          onSave={handleSaveNewName}  // Passando a função para o modal
          onClose={() => setEditingListId(null)} // Fecha o modal sem salvar
        />
      )}

      {showModal && selectedAnime && (
        <AddToListModal
          anime={selectedAnime}
          onClose={() => setShowModal(true)}
        />
      )}
    </div>
  );
};

export default CrunchyList;
