'use client';

import styles from './styles.module.css';
import { useState } from 'react';
import animesData from '@/data/animes.json';

const AnimesPage = () => {
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLaunchPage, setCurrentLaunchPage] = useState(1);

  // Configuração para o carrossel de episódios
  const episodesPerView = 4;
  const episodes = animesData.Episodes;
  const totalEpisodes = episodes.length;
  const maxEpisodeIndex = Math.ceil(totalEpisodes / episodesPerView) - 1;

  // Configuração para Animes Adicionados Recentemente
  const animesPerPage = 18;
  const paginatedAnimes = animesData.Animes.slice(
    (currentPage - 1) * animesPerPage,
    currentPage * animesPerPage
  );
  const totalPages = Math.ceil(animesData.Animes.length / animesPerPage);

  // Configuração para Animes em Lançamento
  const launchAnimesPerPage = 6;
  const paginatedLaunchAnimes = animesData.Animes.filter((anime) => anime.isLancamento).slice(
    (currentLaunchPage - 1) * launchAnimesPerPage,
    currentLaunchPage * launchAnimesPerPage
  );
  const totalLaunchPages = Math.ceil(
    animesData.Animes.filter((anime) => anime.isLancamento).length / launchAnimesPerPage
  );

  // Controle do carrossel de episódios
  const handleNextEpisode = () => {
    if (currentEpisodeIndex < maxEpisodeIndex) setCurrentEpisodeIndex(currentEpisodeIndex + 1);
  };

  const handlePrevEpisode = () => {
    if (currentEpisodeIndex > 0) setCurrentEpisodeIndex(currentEpisodeIndex - 1);
  };

  return (
    <div className={styles.animesPage}>
      <h1 className={styles.title}>Animes</h1>

      {/* Seção de Últimos Episódios como Carrossel */}
      <div className={styles.latestEpisodes}>
        <header className={styles.carouselHeader}>
          <h2>Últimos Episódios</h2>
          <div className={styles.carouselControls}>
            <button onClick={handlePrevEpisode} disabled={currentEpisodeIndex === 0}>
              &#8249;
            </button>
            <button onClick={handleNextEpisode} disabled={currentEpisodeIndex === maxEpisodeIndex}>
              &#8250;
            </button>
          </div>
        </header>
        <div className={styles.carouselContainer}>
          <div
            className={styles.carousel}
            style={{
              transform: `translateX(-${currentEpisodeIndex * 100}%)`,
            }}
          >
            {episodes.map((episode, index) => {
              const anime = animesData.Animes.find((anime) => anime.id === episode.animeId);
              return (
                <div key={index} className={styles.episodeCard}>
                  <div className={styles.episodeImageWrapper}>
                    <img src={episode.image} alt={episode.title} className={styles.episodeImage} />
                  </div>
                  <div className={styles.episodeInfo}>
                    <h3>{anime?.name || 'Anime Desconhecido'}</h3>
                    <span className={styles.releaseDate}>{episode.releaseDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Seção de Animes em Lançamento */}
      <div className={styles.launchingAnimes}>
        <header>
          <h2>Animes em Lançamento</h2>
          <div className={styles.navItems}>
            <button
              onClick={() => currentLaunchPage > 1 && setCurrentLaunchPage(currentLaunchPage - 1)}
              disabled={currentLaunchPage === 1}
            >
              &#8249;
            </button>
            <button
              onClick={() =>
                currentLaunchPage < totalLaunchPages && setCurrentLaunchPage(currentLaunchPage + 1)
              }
              disabled={currentLaunchPage === totalLaunchPages}
            >
              &#8250;
            </button>
          </div>
        </header>
        <div className={styles.animesGrid}>
          {paginatedLaunchAnimes.map((anime) => (
            <div key={anime.id} className={styles.animeCard}>
              <div className={styles.animeImageWrapper}>
                <img src={anime.image} alt={anime.name} className={styles.animeImage} />
                <span className={styles.label}>LANÇAMENTO</span>
              </div>
              <div className={styles.animeInfo}>
                <h3>{anime.name.length > 20 ? `${anime.name.slice(0, 20)}...` : anime.name}</h3>
                <span className={styles.releaseDate}>{anime.data}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Animes Adicionados Recentemente */}
      <div className={styles.recentlyAddedAnimes}>
        <header>
          <h2>Adicionados Recentemente</h2>
          <span>{animesData.Animes.length}</span>
        </header>
        <div className={styles.animesGrid}>
          {paginatedAnimes.map((anime) => (
            <div key={anime.id} className={styles.animeCard}>
              <div className={styles.animeImageWrapper}>
                <img src={anime.image} alt={anime.name} className={styles.animeImage} />
                {anime.isLancamento && <span className={styles.label}>LANÇAMENTO</span>}
              </div>
              <div className={styles.animeInfo}>
                <h3>{anime.name.length > 20 ? `${anime.name.slice(0, 20)}...` : anime.name}</h3>
                <span className={styles.releaseDate}>{anime.data}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Paginação dos Animes Recentes */}
        <div className={styles.paginationControls}>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <div className={styles.paginationItems}>
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
    </div>
  );
};

export default AnimesPage;
