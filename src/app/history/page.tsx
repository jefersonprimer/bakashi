"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import useFetchAnimes from '../../app/hooks/useFetchAnimes';
import useFetchEpisodes from '../../app/hooks/useFetchEpisodes';

import { Anime } from '@/types/anime';
import { Episode } from '@/types/episode';

import styles from './history.module.css';
import Loading from '../loading';

const HistoryPage = () => {
  const { animes, loading: loadingAnimes, error: errorAnimes } = useFetchAnimes(); 
  const { episodes, loading: loadingEpisodes, error: errorEpisodes } = useFetchEpisodes();
  const [history, setHistory] = useState<Episode[]>([]);

  useEffect(() => {
    if (episodes.length > 0) {
      setHistory(episodes.slice(0, 10)); 
    }
  }, [episodes]);

  const getAnimeName = (animeId: string): string => {
    const anime = animes.find((a) => a.id === animeId);
    return anime ? anime.name : 'Anime Desconhecido';
  };

  if (loadingAnimes || loadingEpisodes) {
    return <Loading/>;
  }

  if (errorAnimes || errorEpisodes) {
    return <div>Erro ao carregar os dados.</div>; 
  }

  return (
    <div className={styles['history-container']}>
      <h1 className={styles['history-title']}>Últimos Episódios Assistidos</h1>
      <div className={styles['history-grid']}>
        {history.map((episode) => (
          <div key={episode.id} className={styles['history-item']}>
            <Image 
              src={episode.image} 
              alt={episode.title} 
              className={styles['history-image']} 
              width={300} 
              height={200} 
            />
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
