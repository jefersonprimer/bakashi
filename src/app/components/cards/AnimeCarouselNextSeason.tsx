"use client";

import { useState, useEffect } from "react";
import AnimeCarousel from "./AnimeCarousel"; // Componente de carrossel existente
import { Anime } from "@/types/anime"; // Tipagem de anime
import styles from "./AnimeCarouselNextSeason.module.css"; // Estilos específicos
import useFetchAnimes from "@/app/hooks/useFetchAnimes"; // Hook customizado para buscar os animes da API

interface AnimeCarouselNextSeasonProps {
  itemsPerPage?: number; // Número de itens por página (opcional)
  className?: string; // Classe CSS adicional (opcional)
}

const AnimeCarouselNextSeason: React.FC<AnimeCarouselNextSeasonProps> = ({
  itemsPerPage = 5,
}) => {
  const { animes, loading, error } = useFetchAnimes(); // Hook para buscar os animes da API
  const [nextSeasonAnimes, setNextSeasonAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    if (animes) {
      const filteredAnimes = animes.filter((anime) => anime.isNextSeason);
      setNextSeasonAnimes(filteredAnimes);
    }
  }, [animes]);

  if (loading) {
    return <div>Carregando...</div>;
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
