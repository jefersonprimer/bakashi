"use client";

import { useState, useEffect } from "react";
import AnimeCarousel from "./AnimeCarousel"; // Componente de carrossel existente
import { Anime } from "@/types/anime"; // Tipagem de anime
import styles from "./AnimeCarouselPopularSeason.module.css"; // Estilos específicos
import useFetchAnimes from "@/app/hooks/useFetchAnimes"; // Hook customizado para buscar os animes da API

interface AnimeCarouselPopularSeasonProps {
  itemsPerPage?: number; // Número de itens por página (opcional)
  className?: string; // Classe CSS adicional (opcional)
}

const AnimeCarouselPopularSeason: React.FC<AnimeCarouselPopularSeasonProps> = ({
  itemsPerPage = 5,
  className = "",
}) => {
  const { animes, loading, error } = useFetchAnimes(); // Hook para buscar os animes da API
  const [popularSeasonAnimes, setPopularSeasonAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    if (animes) {
      const filteredAnimes = animes.filter((anime) => anime.isPopularSeason);
      setPopularSeasonAnimes(filteredAnimes);
    }
  }, [animes]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error}</div>;
  }

  if (popularSeasonAnimes.length === 0) {
    return <div>Não há animes populares nesta temporada disponíveis no momento.</div>;
  }

  return (
    <div className={`${styles.popularSeasonContainer} ${className}`}>
      <h1 className={styles.titulo}>Animes Populares da Temporada</h1>
      <p className={styles.subtitulo}>
        Descubra os animes que estão em alta nesta temporada!
      </p>
      <AnimeCarousel animes={popularSeasonAnimes} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselPopularSeason;
