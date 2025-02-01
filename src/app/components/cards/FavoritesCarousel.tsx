"use client";

import React from "react";
import { useFavorites } from "../../contexts/FavoritesContext";
import styles from "./FavoritesCarousel.module.css";
import Link from "next/link";

const FavoritesCarousel = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Sua Lista</h2>
        <div className={styles.filaLink}>
            <Link href="#" className={styles.filaButton}>
            <span>VER FILA</span>
            <svg
                className={styles.angle}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-labelledby="angle-svg"
                aria-hidden="true"
                role="img"
            >
                <title id="angle-svg">Próximo</title>
                <path d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6z"></path>
            </svg>
            </Link>
        </div>
      </div>


      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <img
            src="https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-watchlist.png"
            alt="Empty Watchlist"
            className={styles.image}
          />
          <h4 className={styles.description}>
            Sua Fila merece mais amor. <br /> Vamos enchê-la com animes incríveis.
          </h4>
          <a href="/" className={styles.returnButton}>VOLTAR PARA A TELA INICIAL</a>
        </div>
      ) : (
        <div className={styles.carousel}>
          {favorites.map((anime) => (
            <div key={anime.id} className={styles.animeCard}>
              <img src={anime.image} alt={anime.name} className={styles.animeImage} />
              <div className={styles.animeInfo}>
                <span className={styles.animeName}>{anime.name}</span>
                <span className={styles.animeEpisode}>Começar a Assistir: E1</span>
                <div className={styles.actions}>
                  <span className={styles.audioType}>{anime.audioType}</span>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeFavorite(anime.id)}
                  >
                    <svg
                      className={styles.trashIcon}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      role="img"
                    >
                      <path
                        d="M13 2h-2a1 1 0 0 0-1 1v1H4a1 1 0 0 0 0 2h1v15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6h1a1 1 0 1 0 0-2h-6V3a1 1 0 0 0-1-1m-1 2v2h5v14H7V6h5V4zm-2 5a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesCarousel;
