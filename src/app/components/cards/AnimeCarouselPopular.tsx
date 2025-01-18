"use client";

import { useState, useEffect } from "react";
import AnimeCarousel from "./AnimeCarousel";
import { Anime } from "@/types/anime";
import styles from "./AnimeCarouselPopular.module.css";
import useFetchAnimes from "@/app/hooks/useFetchAnimes"; // Hook customizado para buscar os animes
import Loading from "@/app/loading";

interface AnimeCarousePopularProps {
  itemsPerPage?: number;
  className?: string; // Propriedade opcional
}

const AnimeCarousePopular: React.FC<AnimeCarousePopularProps> = ({
  itemsPerPage = 5,
}) => {
  const { animes, loading, error } = useFetchAnimes(); // Hook para buscar os dados da API
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
        animes popular
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
