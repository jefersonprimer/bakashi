"use client";

import AnimeCarousel from "./AnimeCarousel"; // Componente de carrossel para exibir os filmes
import { Anime } from "@/types/anime"; // Tipagem de anime (também usada para filmes)
import animesData from "@/data/animes.json"; // Dados do JSON com os animes e filmes
import styles from "./MovieCard.module.css"; // Estilos específicos do componente

interface MovieCardProps {
  itemsPerPage?: number; // Número de itens por página (opcional)
  className?: string; // Classe CSS adicional (opcional)
}

const MovieCard: React.FC<MovieCardProps> = ({
  itemsPerPage = 5,
  className = "",
}) => {
  // Filtrar itens onde isMovie = true
  const movies: Anime[] =
    animesData.Animes?.filter((anime) => anime.isMovie) || [];

  return (
    <div className={`${styles.movieContainer} ${className}`}>
      <h1 className={styles.titulo}>Filmes Disponíveis</h1>
      <p className={styles.subtitulo}>
        Descubra os filmes disponíveis na nossa coleção!
      </p>
      <AnimeCarousel animes={movies} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default MovieCard;
