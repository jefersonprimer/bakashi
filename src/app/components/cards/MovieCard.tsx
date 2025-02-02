"use client";

import Loading from "@/app/loading";
import useFetchAnimes from "@/app/hooks/useFetchAnimes"; 
import AnimeCarousel from "./AnimeCarousel";
import { Anime } from "@/types/anime";
import styles from "./AnimeCarouselLancamentos.module.css";
import { useState, useEffect } from "react";

interface MovieCardProps {
  itemsPerPage?: number;
  className?: string; // Propriedade opcional
}

const MovieCard: React.FC<MovieCardProps> = ({
  itemsPerPage = 5,
}) => {
  const { animes, loading, error } = useFetchAnimes(); 
  const [movie, setMovie] = useState<Anime[]>([]);

  useEffect(() => {
    if (animes) {
      const filteredAnimes = animes.filter((anime) => anime.isMovie);
      setMovie(filteredAnimes);
    }
  }, [animes]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error}</div>;
  }

  if (movie.length === 0) {
    return <div>Nenhum filme disponível no momento.</div>;
  }

  return (
    <div className="movie-card">
      <h1 className={styles.titulo}>
        Uma amostra da temporada de outubro de 2024
      </h1>
      <p className={styles.subtitulo}>
        Assista os três primeiros episódios desses simulcasts de outubro de
        2024 de graça!
      </p>
      <AnimeCarousel animes={movie} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default MovieCard;
