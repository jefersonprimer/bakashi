"use client";

import { useState, useEffect } from "react";
import AnimeCarousel from "./AnimeCarousel";
import { Anime } from "@/types/anime";
import styles from "./AnimeCarouselPopularSeason.module.css";
import useFetchAnimes from "@/app/hooks/useFetchAnimes"; // Hook customizado para buscar os animes
import Loading from "@/app/loading";

interface AnimeCarouselPopularSeasonProps {
  itemsPerPage?: number;
  className?: string; // Propriedade opcional
}

const AnimeCarouselPopularSeason: React.FC<AnimeCarouselPopularSeasonProps> = ({
  itemsPerPage = 5,
}) => {
  const { animes, loading, error } = useFetchAnimes(); // Hook para buscar os dados da API
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
