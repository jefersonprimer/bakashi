'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import data from '@/data/animes.json';
import styles from './Episodios.module.css';

interface Anime {
  id: number;
  name: string;
  slug: string;
  image: string;
  isLancamento: boolean;
}

interface Episode {
  id: number;
  animeId: number;
  season: number;
  title: string;
  image: string;
  videoUrl: string;
  releaseDate: string;
  isLancamento: boolean;
}

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

  // Retorna o nome do anime correspondente ao `animeId` de cada episódio
  const getAnimeName = (animeId: number) => {
    const anime = animes.find((a) => a.id === animeId);
    return anime ? anime.name : 'Desconhecido';
  };

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
            currentEpisodes.map((episode) => (
              <div key={episode.id} className={styles.episodeCard}>
                <div className={styles.episodeImageContainer}>
                  {/* Link para a página específica do episódio */}
                  <Link href={`/episodios/${episode.id}`} className={styles.episodeLink}>
                   
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
                <p>{`Episódio ${episode.title.split(' ')[1]}`}</p>
                <p>{`S${episode.season} E${episode.id} / ${episode.releaseDate}`}</p>
                <p>{getAnimeName(episode.animeId)}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Paginação */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? styles.active : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EpisodesPage;
