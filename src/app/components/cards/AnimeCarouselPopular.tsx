"use client";

import { useState, useEffect } from "react";
import AnimeCarousel from "./AnimeCarousel"; // Componente de carrossel existente
import { Anime } from "@/types/anime"; // Tipagem de anime
import styles from "./AnimeCarouselPopular.module.css"; // Estilos específicos
import useFetchAnimes from "@/app/hooks/useFetchAnimes"; // Hook customizado para buscar os animes da API

interface AnimeCarouselPopularProps {
  itemsPerPage?: number; // Número de itens por página (opcional)
  className?: string; // Classe CSS adicional (opcional)
}

const AnimeCarouselPopular: React.FC<AnimeCarouselPopularProps> = ({
  itemsPerPage = 5,
  className = "",
}) => {
  const { animes, loading, error } = useFetchAnimes(); // Hook para buscar os animes da API
  const [popularAnimes, setPopularAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    if (animes) {
      const filteredAnimes = animes.filter((anime) => anime.isPopular);
      setPopularAnimes(filteredAnimes);
    }
  }, [animes]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error}</div>;
  }

  if (popularAnimes.length === 0) {
    return <div>Não há animes populares disponíveis no momento.</div>;
  }

  return (
    <div className={`${styles.popularContainer} ${className}`}>
      <h1 className={styles.titulo}>Animes Populares</h1>
      <p className={styles.subtitulo}>
        Explore os animes mais populares do momento!
      </p>
      <AnimeCarousel animes={popularAnimes} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselPopular;
