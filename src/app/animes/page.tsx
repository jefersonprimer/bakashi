'use client';

import styles from './animes.module.css';
import { useState } from 'react';
import animesData from '@/data/animes.json';

const AnimesPage = () => {
  const animesPerPage = 25; // Máximo de animes por página
  const [currentPage, setCurrentPage] = useState(1);

  // Função para calcular os animes da página atual
  const paginatedAnimes = animesData.Animes.slice(
    (currentPage - 1) * animesPerPage,
    currentPage * animesPerPage
  );

  // Função para calcular o total de páginas
  const totalPages = Math.ceil(animesData.Animes.length / animesPerPage);

  return (
    <div className={styles.animesPage}>
      <h1 className={styles.title}>Animes</h1>

      {/* Seção de Últimos Episódios */}
      <div className={styles.latestEpisodes}>
        <h2>Últimos Episódios</h2>
        <div className={styles.episodesGrid}>
          {animesData.Animes.filter((anime) => anime.isLancamento).map((anime) => (
            <div key={anime.id} className={styles.episodeCard}>
              <img src={anime.image} alt={anime.name} className={styles.episodeImage} />
              <h3>{anime.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Últimos Animes */}
      <div className={styles.latestAnimes}>
        <h2>Últimos Animes</h2>
        <div className={styles.animesGrid}>
          {paginatedAnimes.map((anime) => (
            <a key={anime.id} href={`/animes/${anime.slug}`} className={styles.animeCard}>
              <img src={anime.image} alt={anime.name} className={styles.animeImage} />
              <h3 className={styles.animeTitle}>{anime.name}</h3>
              <span className={styles.releaseDate}>{anime.data}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Paginação */}
      <div className={styles.pagination}>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <div className={styles.paginationControls}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? styles.activePage : styles.pageButton}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimesPage;
