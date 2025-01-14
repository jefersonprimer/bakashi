'use client';

import { useEffect, useState } from 'react';
import { Anime } from '@/types/anime';
import { Episode } from '@/types/episode';

import styles from './history.module.css';

const HistoryPage = () => {
  const [history, setHistory] = useState<Episode[]>([]);
  const [animes, setAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const animesData = await import('@/data/animes.json');
      const episodesData = await import('@/data/episodes.json');
      setAnimes(animesData.animes); 
      setHistory(episodesData.episodes.slice(0, 10)); 
    };
    loadData();
  }, []);

  const getAnimeName = (animeId: string): string => {
    const anime = animes.find((a) => a.id === animeId);
    return anime ? anime.name : 'Anime Desconhecido';
  };

  return (
    <div className={styles['history-container']}>
      <h1 className={styles['history-title']}>Últimos Episódios Assistidos</h1>
      <div className={styles['history-grid']}>
        {history.map((episode) => (
          <div key={episode.id} className={styles['history-item']}>
            <img src={episode.image} alt={episode.title} className={styles['history-image']} />
            <h3>{getAnimeName(episode.animeId)}</h3>
            <p>{`S${episode.season} / ${episode.releaseDate}`}</p>
            <p>{episode.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
