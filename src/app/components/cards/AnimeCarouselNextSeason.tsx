"use client";

import useFetchAnimes from "@/app/hooks/useFetchAnimes"; 
import { Anime } from "@/types/anime"; 
import AnimeCarousel from "./AnimeCarousel"; 
import styles from "./AnimeCarouselNextSeason.module.css";

import { useState, useEffect } from "react";
import Loading from "@/app/loading";

interface AnimeCarouselNextSeasonProps {
  itemsPerPage?: number; // Número de itens por página (opcional)
  className?: string; // Classe CSS adicional (opcional)
}

const AnimeCarouselNextSeason: React.FC<AnimeCarouselNextSeasonProps> = ({
  itemsPerPage = 5,
}) => {
  const { animes, loading, error } = useFetchAnimes(); 
  const [nextSeasonAnimes, setNextSeasonAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    if (animes) {
      const filteredAnimes = animes.filter((anime) => anime.isNextSeason);
      setNextSeasonAnimes(filteredAnimes);
    }
  }, [animes]);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error}</div>;
  }

  if (nextSeasonAnimes.length === 0) {
    return <div>Não há animes programados para a próxima temporada.</div>;
  }

  return (
    <div className={`${styles.nextSeasonContainer} anime-carousel-next-season`}>
      <h1 className={styles.titulo}>Animes da Próxima Temporada</h1>
      <p className={styles.subtitulo}>
        Confira os animes mais esperados para a próxima temporada!
      </p>
      <AnimeCarousel animes={nextSeasonAnimes} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselNextSeason;
