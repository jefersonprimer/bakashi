'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import animeData from '@/data/animes.json'; // Dados importados corretamente
import { Anime } from "@/types/anime";

export default function Glossary() {
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [activeLetter, setActiveLetter] = useState<string>('#');
  const [showFilterOptions, setShowFilterOptions] = useState(false); // Controla a exibição dos filtros
  const router = useRouter();

  useEffect(() => {
    // Inicializando com todos os animes
    setFilteredAnimes(animeData.animes);
  }, []);

  // Função para filtrar os animes por letra
  const handleLetterClick = (letter: string) => {
    setActiveLetter(letter);

    if (letter === '#') {
      setFilteredAnimes(animeData.animes); // Mostra todos os animes
    } else {
      const filtered = animeData.animes.filter((anime) =>
        anime.name[0].toUpperCase() === letter.toUpperCase()
      );
      setFilteredAnimes(filtered || []);
    }
  };

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

  // Geração de letras para o filtro
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className={styles.glossaryContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Ver Todos os Animes</h1>

        {/* Filtro de Ordem Alfabética e as opções */}
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
            ORDEM ALFÁBETICA
          </div>
          {showFilterOptions && (
            <div className={styles.filterOptions}>
              <div onClick={goToPopular}>Mais Populares</div>
              <div onClick={goToNewReleases}>Mais Recentes</div>
              <div onClick={goToAlphabeticOrder}>Ordem Alfabética</div>
            </div>
          )}
        </div>
      </div>

      {/* Filtro de letras */}
      <div className={styles.letterFilter}>
        <button onClick={() => handleLetterClick('#')}>#</button>
        {letters.map((letter) => (
          <button key={letter} onClick={() => handleLetterClick(letter)}>
            {letter}
          </button>
        ))}
      </div>

      <div className={styles.carousel}>
        {filteredAnimes.length > 0 ? (
          filteredAnimes.map((anime) => (
            <div key={anime.id} className={styles.anime_card}>
              <div className={styles.anime_content}>
                <img
                  src={anime.image}
                  alt={anime.name}
                  className={styles.anime_image}
                />
                <div className={styles.anime_details}>
                  <h3 className={styles.anime_name}>{anime.name}</h3>
                  <p className={styles.anime_synopsis}>{anime.synopsis}</p>
                  <p className={styles.anime_audio}>
                    <strong>Áudio:</strong> {anime.audioType}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum anime encontrado com a letra "{activeLetter}".</p>
        )}
      </div>
    </div>
  );
}
