'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import animesData from '@/data/animes.json';
import episodesData from '@/data/episodes.json';
import styles from './styles.module.css';

import { Anime } from '@/types/anime';
import { Episode } from '@/types/episode';

const EpisodesPage = () => {
  const animes: Anime[] = animesData.animes;
  const episodes: Episode[] = episodesData.episodes;

  const [currentPage, setCurrentPage] = useState(1);
  const episodesPerPage = 30;
  const totalPages = Math.ceil(episodes.length / episodesPerPage);

  const currentEpisodes = episodes.slice(
    (currentPage - 1) * episodesPerPage,
    currentPage * episodesPerPage
  );

  const getAnimeName = (animeId: string) => {
    const anime = animes.find((a) => a.id === animeId);
    return anime ? anime.name : 'Desconhecido';
  };

  const playEpisode = (videoUrl: string) => {
    window.open(videoUrl, '_blank');
  };

  const generatePageButtons = () => {
    const delta = 2;
    const range = [];

    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    return range;
  };

  if (!episodes || episodes.length === 0) {
    return <div className={styles.error}>Nenhum episódio encontrado.</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Episódios</h1>
        <div className={styles.headerInfo}>
          <h2 className={styles.subtitle}>Adicionados Recentemente</h2>
          <span className={styles.episodeCount}>{episodes.length}</span>
        </div>
      </header>

      <div className={styles.grid}>
        {currentEpisodes.map((episode) => {
          const episodeNumber = episode.title.match(/\d+/)?.[0] || 'Desconhecido';

          return (
            <div key={episode.id} className={styles.episodeCard}>
              {episode.isLancamento && (
                <span className={styles.lancamentoLabel}>LANÇAMENTO</span>
              )}
              <div className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src={episode.image}
                  alt={`Episódio ${episodeNumber}`}
                />
                <div
                  className={styles.playButton}
                  onClick={() => playEpisode(episode.videoUrl)}
                  role="button"
                  aria-label={`Assistir ${episodeNumber}`}
                >
                  <FontAwesomeIcon icon={faPlay} className={styles.playIcon} />
                </div>
              </div>
              <p className={styles.animeName}>{getAnimeName(episode.animeId)}</p>
              <p className={styles.episodeInfo}>{`Episódio ${episodeNumber}`}</p>
            </div>
          );
        })}
      </div>

      <div className={styles.pagination}>
        {generatePageButtons().map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`${styles.pageButton} ${
              currentPage === page ? styles.active : ''
            }`}
            aria-label={`Ir para a página ${page}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EpisodesPage;
