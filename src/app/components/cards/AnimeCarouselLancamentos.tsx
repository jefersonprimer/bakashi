"use client";

import Loading from "@/app/loading";
import useFetchAnimes from "@/app/hooks/useFetchAnimes";
import { Anime } from "@/types/anime";
import AnimeCarousel from "./AnimeCarousel";
import styles from "./AnimeCarouselLancamentos.module.css";

import { useState, useEffect } from "react";

interface AnimeCarouselLancamentosProps {
  itemsPerPage?: number;
  className?: string; // Propriedade opcional
}

const AnimeCarouselLancamentos: React.FC<AnimeCarouselLancamentosProps> = ({
  itemsPerPage = 5,
}) => {
  const { animes, loading, error } = useFetchAnimes(); 
  const [lancamentos, setLancamentos] = useState<Anime[]>([]);

  useEffect(() => {
    if (animes) {
      const filteredAnimes = animes.filter((anime) => anime.isRelease);
      setLancamentos(filteredAnimes);
    }
  }, [animes]);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error}</div>;
  }

  if (lancamentos.length === 0) {
    return <div>Nenhum lançamento disponível no momento.</div>;
  }

  return (
    <div className="anime-carousel-lancamentos">
      <h1 className={styles.titulo}>
       Uma amostra da temporada de inverno 2025
      </h1>
      <p className={styles.subtitulo}>
       Assista os três primeiros episódios desses simulcasts da inverno 2025 de graça!
      </p>
      <AnimeCarousel animes={lancamentos} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselLancamentos;
