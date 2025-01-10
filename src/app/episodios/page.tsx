'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import data from '@/data/animes.json';
import styles from './styles.module.css';

// Importando as interfaces de Anime e Episode
import { Anime } from '@/types/anime';
import { Episode } from '@/types/episode';

const EpisodesPage = () => {
  const animes: Anime[] = data.Animes;
  const episodes: Episode[] = data.Episodes;

  const [currentPage, setCurrentPage] = useState(1);

  const episodesPerPage = 30;
  const totalPages = Math.ceil(episodes.length / episodesPerPage);

  // Paginação
  const currentEpisodes = episodes.slice(
    (currentPage - 1) * episodesPerPage,
    currentPage * episodesPerPage
  );

  // Retorna o nome do anime correspondente ao `animeId` de cada episódio
  const getAnimeName = (animeId: number) => {
    const anime = animes.find((a) => a.id === animeId);
    return anime ? anime.name : 'Desconhecido';
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Episódios</h1>
        <div className={styles.headerInfo}>
          <h2 className={styles.subtitle}>Adicionados Recentemente</h2>
          <span className={styles.episodeCount}>{episodes.length}</span>
        </div>
      </header>

      {/* Lista de Episódios */}
      <div className={styles.grid}>
        {currentEpisodes.length === 0 ? (
          <div className={styles.loading}>Carregando episódios...</div>
        ) : (
          currentEpisodes.map((episode) => (
            <div key={episode.id} className={styles.episodeCard}>
              {episode.isLancamento && (
                <span className={styles.lancamentoLabel}>LANÇAMENTO</span>
              )}
              <div className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src={episode.image}
                  alt={`Episódio ${episode.id}`}
                />
                {/* Botão de Play */}
                <div className={styles.playButton}>
                  <FontAwesomeIcon icon={faPlay} className={styles.playIcon} />
                </div>
              </div>
              <p className={styles.animeName}>{getAnimeName(episode.animeId)}</p>
              <p className={styles.episodeInfo}>
                {`Episódio ${episode.title.split(' ')[1]}`}
              </p>
              {/* <p className={styles.episodeDetails}>
                {`S${episode.season} E${episode.id} / ${episode.releaseDate}`}
              </p> */}
            </div>
          ))
        )}
      </div>

      {/* Paginação */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`${styles.pageButton} ${
              currentPage === index + 1 ? styles.active : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EpisodesPage;
