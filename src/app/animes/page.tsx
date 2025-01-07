'use client';

import styles from './styles.module.css';
import { useState } from 'react';
import animesData from '@/data/animes.json';

const AnimesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLaunchPage, setCurrentLaunchPage] = useState(1);

  // Função para calcular os animes da página atual
  const animesPerPage = 18;
  const paginatedAnimes = animesData.Animes.slice(
    (currentPage - 1) * animesPerPage,
    currentPage * animesPerPage
  );

  const launchAnimesPerPage = 6;
  const paginatedLaunchAnimes = animesData.Animes.filter((anime) => anime.isLancamento).slice(
    (currentLaunchPage - 1) * launchAnimesPerPage,
    currentLaunchPage * launchAnimesPerPage
  );

  // Função para calcular o total de páginas
  const totalPages = Math.ceil(animesData.Animes.length / animesPerPage);
  const totalLaunchPages = Math.ceil(animesData.Animes.filter((anime) => anime.isLancamento).length / launchAnimesPerPage);

  return (
    <div className={styles.animesPage}>
      <h1 className={styles.title}>Animes</h1>

      {/* Seção de Últimos Episódios */}
      <div className={styles.latestEpisodes}>
        <div className={styles.episodesGrid}>
          {animesData.Episodes.map((episode) => {
            // Encontrando o anime correspondente a esse episódio
            const anime = animesData.Animes.find((anime) => anime.id === episode.animeId); // Supondo que você tenha um `animeId` no episódio
            
            return (
              <div key={episode.id} className={styles.episodeCard}>
                {/* Contêiner da imagem */}
                <div className={styles.episodeImageWrapper}>
                  <img
                    src={episode.image}
                    alt={episode.title}
                    className={styles.episodeImage}
                  />
                </div>

                {/* Info sobre o episódio e o anime */}
                <div className={styles.episodeInfo}>
                  <h3>{anime?.name}</h3> {/* Exibe o nome do anime */}
                  <span className={styles.releaseDate}>{episode.releaseDate}</span> {/* Exibe a data do episódio */}
                </div>
              </div>
            );
          })}
        </div>

        {/* Botões para navegar entre os episódios */}
        <div className={styles.paginationControls}>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            Carregar mais
          </button>
        </div>
      </div>

      {/* Seção de Animes em Lançamento */}
      <div className={styles.launchingAnimes}>
        <header>
          <h2>Animes em Lançamento</h2>
          <div className="nav_items_module">
            <a
              className="btn prevf"
              onClick={() => currentLaunchPage > 1 && setCurrentLaunchPage(currentLaunchPage - 1)}
            >
              <i className="fas fa-caret-left"></i>
            </a>
            <a
              className="btn nextf"
              onClick={() => currentLaunchPage < totalLaunchPages && setCurrentLaunchPage(currentLaunchPage + 1)}
            >
              <i className="fas fa-caret-right"></i>
            </a>
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
