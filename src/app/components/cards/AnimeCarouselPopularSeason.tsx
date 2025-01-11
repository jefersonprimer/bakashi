"use client";

import AnimeCarousel from "./AnimeCarousel"; // Componente de carrossel existente
import { Anime } from "@/types/anime"; // Tipagem de anime
import animesData from "@/data/animes.json"; // Dados do JSON
import styles from "./AnimeCarouselPopularSeason.module.css"; // Estilos específicos

interface AnimeCarouselPopularSeasonProps {
  itemsPerPage?: number; // Número de itens por página (opcional)
  className?: string; // Classe CSS adicional (opcional)
}

const AnimeCarouselPopularSeason: React.FC<AnimeCarouselPopularSeasonProps> = ({
  itemsPerPage = 5,
  className = "",
}) => {
  // Filtrar os animes populares da temporada
  const popularSeasonAnimes: Anime[] =
    animesData.Animes?.filter((anime) => anime.isPopularSeason) || [];

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
