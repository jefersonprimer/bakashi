"use client";

import Loading from "@/app/loading";
import useFetchAnimes from "@/app/hooks/useFetchAnimes"; 
import { Anime } from "@/types/anime";
import AnimeCarousel from "./AnimeCarousel";
import styles from "./AnimeCarouselPopular.module.css";

import { useState, useEffect } from "react";

interface AnimeCarousePopularProps {
  itemsPerPage?: number;
  className?: string; // Propriedade opcional
}

const AnimeCarousePopular: React.FC<AnimeCarousePopularProps> = ({
  itemsPerPage = 5,
}) => {
  const { animes, loading, error } = useFetchAnimes(); 
  const [popular, setPopular] = useState<Anime[]>([]);

  useEffect(() => {
    if (animes) {
      const filteredAnimes = animes.filter((anime) => anime.isPopular);
      setPopular(filteredAnimes);
    }
  }, [animes]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error}</div>;
  }

  if (popular.length === 0) {
    return <div>Nenhum anime popular disponível no momento.</div>;
  }

  return (
    <div className="anime-carousel-popular">
      <h1 className={styles.titulo}>
        Animes Populares
      </h1>
      <p className={styles.subtitulo}>
        Assista os três primeiros episódios desses simulcasts de outubro de
        2024 de graça!
      </p>
      <AnimeCarousel animes={popular} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarousePopular;
