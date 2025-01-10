// src/pages/episodios/EpisodiosPage.tsx (ou o caminho correto do seu arquivo)

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import data from '@/data/animes.json';
import styles from './Episodios.module.css';

// Importando as interfaces dos arquivos corretos
import { Anime } from '@/types/anime'; // Caminho correto para Anime
import { Episode } from '@/types/episode'; // Caminho correto para Episode

const EpisodesPage = () => {
  const animes: Anime[] = data.Animes;
  const episodes: Episode[] = data.Episodes;

  const [currentPage, setCurrentPage] = useState(1);
  const episodesPerPage = 20;
  const totalPages = Math.ceil(episodes.length / episodesPerPage);

  // Paginação
  const currentEpisodes = episodes.slice(
    (currentPage - 1) * episodesPerPage,
    currentPage * episodesPerPage
  );

  // Retorna o anime correspondente ao `animeId` de cada episódio
  const getAnimeById = (animeId: number) => animes.find((a) => a.id === animeId);

  return (
    <div>
      {/* Header da página de episódios */}
      <header className={styles.header}>
        <h2>Episódios</h2>
        <span>
          {episodes.length}{' '}
          <a href="/episodios" className={styles.seeAll}>
            Ver todos
          </a>
        </span>
      </header>

      {/* Contêiner de Episódios */}
      <div className={styles.episodesContainer}>
        <div className={styles.grid}>
          {currentEpisodes.length === 0 ? (
            <div>Carregando episódios...</div>
          ) : (
            currentEpisodes.map((episode) => {
              const anime = getAnimeById(episode.animeId);
              return (
                <div key={episode.id} className={styles.episodeCard}>
                  <div className={styles.episodeImageContainer}>
                    {/* Link para a página específica do episódio */}
                    <Link
                      href={`/episodios/${anime?.slug || 'desconhecido'}/${episode.id}`}
                      className={styles.episodeLink}
                    >
                      <img
                        src={episode.image}
                        alt={`Episódio ${episode.title}`}
                        className={styles.episodeImage}
                      />
                      {episode.isLancamento && (
                        <div className={styles.lancamentoLabel}>LANÇAMENTO</div>
                      )}
                      <div className={styles.playButton}>
                        <FontAwesomeIcon icon={faPlay} className={styles.playIcon} />
                      </div>
                    </Link>
                  </div>
                  <p>{anime?.name || 'Anime Desconhecido'}</p>
                  <p>{`Episódio ${episode.title.split(' ')[1] || episode.id}`}</p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Paginação */}
      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? styles.active : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default EpisodesPage;
