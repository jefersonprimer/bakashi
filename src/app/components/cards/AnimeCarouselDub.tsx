"use client";

import Loading from "@/app/loading";
import useFetchAnimes from "@/app/hooks/useFetchAnimes"; 
import { Anime } from "@/types/anime"; 
import AnimeCarousel from "./AnimeCarousel"; 
import styles from "./AnimeCarouselDub.module.css"; 

import { useEffect, useState } from "react";

interface AnimeCarouselDubProps {
  itemsPerPage?: number; 
  className?: string;
}

const AnimeCarouselDub: React.FC<AnimeCarouselDubProps> = ({
  itemsPerPage = 5,
  className = "",
}) => {
  const { animes, loading, error } = useFetchAnimes();
  const [animesWithDub, setAnimesWithDub] = useState<Anime[]>([]);

  // Filtrar animes com áudio dublado
  useEffect(() => {
    if (animes) {
      const filteredAnimes = animes.filter((anime) =>
        anime.audioType.match(/\b(Dub|Dublado)\b/i)
      );
      setAnimesWithDub(filteredAnimes);
    }
  }, [animes]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error}</div>;
  }

  return (
    <div className={`${styles.audioTypeContainer} ${className}`}>
      <h1 className={styles.titulo}>Dublagens em Português</h1>
      <p className={styles.subtitulo}>
        Descubra os animes disponíveis com áudio dublado!
      </p>
      <AnimeCarousel animes={animesWithDub} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselDub;
