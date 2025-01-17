"use client";

import { useState, useEffect } from "react";
import AnimeCarousel from "./AnimeCarousel"; // Importe o AnimeCarousel existente
import { Anime } from "@/types/anime"; // Importe a interface de tipagem
import useFetchAnimes from "@/app/hooks/useFetchAnimes"; // Hook para buscar os animes da API

interface AnimeCarouselTodosProps {
  itemsPerPage?: number;
}

const AnimeCarouselTodos: React.FC<AnimeCarouselTodosProps> = ({
  itemsPerPage = 5,
}) => {
  const { animes, loading, error } = useFetchAnimes(); // Hook customizado para buscar os animes da API

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar os animes: {error}</div>;
  }

  if (!animes || animes.length === 0) {
    return <div>Não há animes disponíveis no momento.</div>;
  }

  return (
    <div>
      <h1>Todos os Animes</h1> {/* Título H1 adicionado */}
      <AnimeCarousel animes={animes} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselTodos;
