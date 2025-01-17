"use client";

import { useState, useEffect } from "react";
import AnimeCarousel from "./AnimeCarousel"; // Componente de carrossel para exibir os filmes
import { Anime } from "@/types/anime"; // Tipagem de anime (também usada para filmes)
import useFetchMovies from "../../hooks/useFetchMovies"; // Hook customizado para buscar filmes da API
import styles from "./MovieCard.module.css"; // Estilos específicos do componente

interface MovieCardProps {
  itemsPerPage?: number; // Número de itens por página (opcional)
  className?: string; // Classe CSS adicional (opcional)
}

const MovieCard: React.FC<MovieCardProps> = ({
  itemsPerPage = 5,
  className = "",
}) => {
  const { movies, loading, error } = useFetchMovies(); // Hook para buscar os filmes

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar os filmes: {error}</div>;
  }

  if (!movies || movies.length === 0) {
    return <div>Não há filmes disponíveis no momento.</div>;
  }

  return (
    <div className={`${styles.movieContainer} ${className}`}>
      <h1 className={styles.titulo}>Filmes Disponíveis</h1>
      <p className={styles.subtitulo}>Pegue a pipoca!</p>
      <AnimeCarousel animes={movies} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default MovieCard;
