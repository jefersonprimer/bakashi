'use client';

import { useEffect, useState } from 'react';
import styles from './historico.module.css';

interface Anime {
  id: number;
  name: string;
  slug: string;
  data: string;
  image: string;
  synopsis: string;
  isLancamento: boolean;
  rating: string;
  score: number;
  genres: string[];
  airing: string;
  episodes: number;
  season: number;
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

const HistoryPage = () => {
  const [history, setHistory] = useState<Episode[]>([]);
  const [animes, setAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    // Carregar dados do JSON local
    import('@/data/animes.json').then((data) => {
      setAnimes(data.Animes);
      setHistory(data.Episodes.slice(0, 10)); // Exibe os últimos 10 episódios
    });
  }, []);

  const getAnimeName = (animeId: number): string => {
    const anime = animes.find((a) => a.id === animeId);
    return anime ? anime.name : 'Anime Desconhecido';
  };

  return (
    <div className={styles['history-container']}>
      <h1 className={styles['history-title']}>Últimos Episódios Assistidos</h1>
      <div className={styles['history-grid']}>
        {history.map((episode) => (
          <div key={episode.id} className={styles['history-item']}>
            <img src={episode.image} alt={episode.title} />
            <h3>{getAnimeName(episode.animeId)}</h3>
            <p>
              {`S${episode.season} E${episode.id} / ${episode.releaseDate}`}
            </p>
            <p>{episode.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
