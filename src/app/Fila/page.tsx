'use client';

import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import styles from './styles.module.css';

const Fila = () => {
  const { favorites, removeFavorite } = useFavorites(); // Função de remoção de favorito

  const handleRemoveFavorite = (id) => {
    removeFavorite(id); // Chama a função de remoção passando o id do anime
  };

  return (
    <div className={styles.emptyListBox}>
      {favorites.length === 0 ? (
        <div className={styles.wrapper}>
          <img
            src="https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-watchlist.png"
            alt="Empty Watchlist"
            className={styles.image}
          />
          <h4 className={styles.description}>
            Sua Fila merece mais amor. <br /> Vamos enchê-la com animes incríveis.
          </h4>
          <div className={styles.button}>
            <a href="/" className={styles.returnButton}>
              Voltar para tela inicial
            </a>
          </div>
        </div>
      ) : (
        <ul className={styles.animeList}>
          {favorites.map((anime) => (
            <li key={anime.id} className={styles.animeItem}>
              <img src={anime.image} alt={anime.name} className={styles.animeImage} />
                <div className={styles.texts}>
                  <span className={styles.name}>
                    {anime.name}
                  </span>
                  <span>Comecar a Assistir: E1</span>
                    <div className={styles.buttons}>
                      <span>{anime.audioType}</span>
                      <button
                        className={styles.removeButton}
                        onClick={() => handleRemoveFavorite(anime.id)}
                      >
                        <svg
                          className={styles.trashIcon}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          data-t="trash-svg"
                          aria-hidden="true"
                          role="img"
                          style={{ backgroundColor: 'transparent' }} // Garante fundo transparente
                        >
                          <title>Remover</title>  {/* A dica de ferramenta "Remover" vai aparecer aqui */}
                          <path
                            d="M13 2h-2a1 1 0 0 0-1 1v1H4a1 1 0 0 0 0 2h1v15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6h1a1 1 0 1 0 0-2h-6V3a1 1 0 0 0-1-1m-1 2v2h5v14H7V6h5V4zm-2 5a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1z"
                            fill="none"  // Remove o fundo
                            stroke="#000"  // Cor do traço (preto, pode ser alterado)
                            strokeWidth="2"  // Tamanho do traço
                          />
                        </svg>
                      </button>

                    </div>
                </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Fila;
