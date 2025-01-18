'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import animesData from '@/data/animes.json'; // Dados importados corretamente
import { Anime } from "@/types/anime";
import AnimeGrid from "../../components/cards/AnimeGrid"; // Importação do componente AnimeGrid

export default function NewReleasesPage() {
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false); // Controla a exibição dos filtros
  const router = useRouter();

  useEffect(() => {
    // Inicializando com todos os animes
    setFilteredAnimes(animesData.animes.filter((anime: Anime) => anime.newReleases === true));
  }, []);

  // Funções para ativar/desativar o menu de filtros
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
    <div className={styles.newReleasesContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Animes Recém-Adicionados</h1>
        <div className={styles.filters}>
          <div onClick={toggleFilterOptions}>
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
            <span className={styles.maisRecentes}>MAIS RECENTES</span>
          </div>
          
          {/* Filtro de opções que aparece sobre o botão */}
          {showFilterOptions && (
            <div className={styles.filterOptions}>
              <div onClick={goToPopular}>Mais Populares</div>
              <div onClick={goToNewReleases}>Mais Recentes</div>
              <div onClick={goToAlphabeticOrder}>Ordem Alfabética</div>
            </div>
          )}
        </div>
      </div>

      {/* Substituindo AnimeCarousel por AnimeGrid */}
      <div className={styles.gridPopular}>
        <h1 className={styles.newTitle}>Ultimos Lançamentos</h1>
        <AnimeGrid animes={filteredAnimes} />
      </div>
    </div>
  );
}
