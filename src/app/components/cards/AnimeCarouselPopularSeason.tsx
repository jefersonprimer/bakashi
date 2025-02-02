"use client";

import Loading from "@/app/loading";
import useFetchAnimes from "@/app/hooks/useFetchAnimes"; 
import AnimeCarousel from "./AnimeCarousel";
import styles from "./AnimeCarouselPopularSeason.module.css";
import { Anime } from "@/types/anime";

import { useState, useEffect } from "react";

interface AnimeCarouselPopularSeasonProps {
  itemsPerPage?: number;
  className?: string; // Propriedade opcional
}

const AnimeCarouselPopularSeason: React.FC<AnimeCarouselPopularSeasonProps> = ({
  itemsPerPage = 5,
}) => {
  const { animes, loading, error } = useFetchAnimes(); 
  const [popularSeason, setPopularSeason] = useState<Anime[]>([]);

  useEffect(() => {
    if (animes) {
      const filteredAnimes = animes.filter((anime) => anime.isPopularSeason);
      setPopularSeason(filteredAnimes);
    }
  }, [animes]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error}</div>;
  }

  if (popularSeason.length === 0) {
    return <div>Nenhum anime popular disponível no momento.</div>;
  }

  return (
    <div className="anime-carousel-popular-season">
      <h1 className={styles.titulo}>
        Animes Populares da Temporada
      </h1>
      <p className={styles.subtitulo}>
        Assista os três primeiros!
      </p>
      <AnimeCarousel animes={popularSeason} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselPopularSeason;
