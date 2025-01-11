"use client";

import AnimeCarousel from "./AnimeCarousel"; // Componente de carrossel existente
import { Anime } from "@/types/anime"; // Tipagem de anime
import animesData from "@/data/animes.json"; // Dados do JSON
import styles from "./AnimeCarouselPopular.module.css"; // Estilos específicos

interface AnimeCarouselPopularProps {
  itemsPerPage?: number; // Número de itens por página (opcional)
  className?: string; // Classe CSS adicional (opcional)
}

const AnimeCarouselPopular: React.FC<AnimeCarouselPopularProps> = ({
  itemsPerPage = 5,
  className = "",
}) => {
  // Filtrar os animes populares (isPopular = true)
  const popularAnimes: Anime[] =
    animesData.Animes?.filter((anime) => anime.isPopular) || [];

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
