// src/app/popular/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AnimeCarousel from "../../components/cards/AnimeCarousel";
import { Anime } from "@/types/anime";

// Dados importados de JSON ou pode ser via API
import animesData from "@/data/animes.json"; 
import styles from './styles.module.css';

export default function PopularPage() {
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false); // Controla a exibição dos filtros
  const router = useRouter();

  useEffect(() => {
    // Inicializando com todos os animes populares
    setFilteredAnimes(animesData.animes.filter((anime: Anime) => anime.isPopular === true));
  }, []);

  // Função para ativar/desativar o menu de filtros
  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  // Funções para navegação por filtros
  const goToPopular = () => {
    router.push('/videos/popular');
  };

  const goToNewReleases = () => {
    router.push('/videos/new');
  };

  const goToAlphabeticOrder = () => {
    router.push('/videos/alphabetical');
  };

  return (
    <div className={styles.popularContainer}>
      <div className={styles.header}>
        {/* Título e ícone alinhados horizontalmente */}
        <h1 className={styles.title}>Animes Populares</h1>
        <div className={styles.filters}>
          <button onClick={toggleFilterOptions}>
            <svg 
              className={styles.svgIcon}
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              aria-labelledby="sort-svg" 
              aria-hidden="true" 
              role="img"
            >
              <title id="sort-svg">Ordenar</title>
              <path d="M9 18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h6zM21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm-6 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h12z"></path>
            </svg>
            Mais Populares
          </button>
          
          {/* Filtro de opções que aparece sobre o botão */}
          {showFilterOptions && (
            <div className={styles.filterOptions}>
              <button onClick={goToPopular}>Mais Populares</button>
              <button onClick={goToNewReleases}>Mais Recentes</button>
              <button onClick={goToAlphabeticOrder}>Ordem Alfabética</button>
            </div>
          )}
        </div>
      </div>

      {/* Carrossel de Animes Populares */}
      <AnimeCarousel animes={filteredAnimes} />
    </div>
  );
}
