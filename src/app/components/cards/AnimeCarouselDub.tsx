"use client";

import { useEffect, useState } from "react";
import AnimeCarousel from "./AnimeCarousel"; // Componente de carrossel para exibir os animes
import { Anime } from "@/types/anime"; // Tipagem de anime
import useFetchAnimes from "@/app/hooks/useFetchAnimes"; // Hook para buscar dados da API
import styles from "./AnimeCarouselDub.module.css"; // Estilos para o componente

interface AnimeCarouselDubProps {
  itemsPerPage?: number; // Número de itens por página (opcional)
  className?: string; // Classe CSS adicional (opcional)
}

const AnimeCarouselDub: React.FC<AnimeCarouselDubProps> = ({
  itemsPerPage = 5,
  className = "",
}) => {
  const { animes, loading, error } = useFetchAnimes(); // Busca os animes da API
  const [animesWithDub, setAnimesWithDub] = useState<Anime[]>([]);

  // Filtrar animes com áudio dublado
  useEffect(() => {
    if (animes) {
      const filteredAnimes = animes.filter((anime) =>
        anime.audioType.match(/\b(Dub|Dublado)\b/i)
      );
      setAnimesWithDub(filteredAnimes);
    }
  }, [animes]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar os dados: {error}</div>;
  }

  return (
    <div className={`${styles.audioTypeContainer} ${className}`}>
      <h1 className={styles.titulo}>Dublagens em Português</h1>
      <p className={styles.subtitulo}>
        Descubra os animes disponíveis com áudio dublado!
      </p>
      <AnimeCarousel animes={animesWithDub} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselDub;
