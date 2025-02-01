'use client';

import React from 'react';
import { useHistory } from '../../contexts/HistoryContext';
import useFetchAnimes from '../../hooks/useFetchAnimes'; // Usado para pegar os animes
import { Episode } from '@/types/episode';
import Link from 'next/link';
import styles from './HistoryCarousel.module.css';
import Loading from '../../loading';

const HistoryCarousel = () => {
  const { history, removeEpisode } = useHistory();
  const { animes, loading, error } = useFetchAnimes();

  const getAnimeName = (animeId: string): string => {
    const anime = animes.find((a) => a.id === animeId);
    return anime ? anime.name : 'Anime Desconhecido';
  };

  const handleRemoveEpisode = (episodeId: string) => {
    removeEpisode(episodeId); // Remover episódio do histórico
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Erro ao carregar os dados dos animes.</div>;
  }

  return (
    <div className={styles['history-carousel-container']}>
      <h2 className={styles['history-title']}>Últimos Episódios Assistidos</h2>
      <div className={styles['history-carousel']}>
        {history.length > 0 ? (
          history.map((episode: Episode) => (
            <div key={episode.id} className={styles['history-item']}>
              <img
                src={episode.image}
                alt={episode.title}
                className={styles['history-image']}
                width={300}
                height={200}
              />
              <div className={styles['episode-info']}>
                <h3>{getAnimeName(episode.animeId)}</h3>
                <p>{`S${episode.season} / ${episode.releaseDate}`}</p>
                <p>{episode.title}</p>
                <Link href={`/watch/${episode.id}/${episode.slug}`} className={styles['watch-button']}>
                  Assistir
                </Link>
                <button 
                  className={styles['remove-button']} 
                  onClick={() => handleRemoveEpisode(episode.id)}
                >
                  <img
                    src="https://img.icons8.com/ios-filled/50/000000/trash.png" // Ícone de lixeira
                    alt="Remove"
                    className={styles.trashIcon}
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum episódio assistido.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryCarousel;
