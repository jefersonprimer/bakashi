'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./TodosAnimes.module.css";

// Interface para Anime, refletindo a estrutura do seu JSON
interface Anime {
  id: number;
  name: string;
  slug: string;
  data: string;
  image: string;
  synopsis: string;
  isLancamento: boolean;
  rating: string;
  score: number;
  genres: string[];
  airing: string;
  episodes: number;
  season: number;
}

interface TodosAnimesProps {
  todosAnimes: Anime[];
}

const TodosAnimes: React.FC<TodosAnimesProps> = ({ todosAnimes }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0); // Página atual
  const cardsPerPage = 7; // Número máximo de cards por página

  // Calcula o índice inicial e final dos cards a serem exibidos
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = todosAnimes.slice(startIndex, endIndex);

  // Funções de navegação
  const handleNext = () => {
    if (endIndex < todosAnimes.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleCardClick = (slug: string) => {
    router.push(`/animes/${slug}`);
  };

  return (
    <div>
      <header className={styles.header}>
        <h2>Animes Online</h2>
        <div className={styles.navItems}>
          <button
            className={`${styles.btn} ${styles.prev}`}
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            <i className="fas fa-caret-left"></i>
          </button>
          <button
            className={`${styles.btn} ${styles.next}`}
            onClick={handleNext}
            disabled={endIndex >= todosAnimes.length}
          >
            <i className="fas fa-caret-right"></i>
          </button>
        </div>
      </header>
      <div className={styles.cardContainer}>
        {currentCards.map((anime) => (
          <div
            key={anime.id}
            className={styles.card}
            onClick={() => handleCardClick(anime.slug)}
          >
            <div className={styles.poster}>
              <img
                src={anime.image}
                alt={anime.name}
                className={styles.posterImg}
              />
              {/* Renderizando a label "LANÇAMENTO" caso isLancamento seja true */}
              {anime.isLancamento && <div className={styles.label}>LANÇAMENTO</div>}
            </div>
            <div className={styles.data}>
              <h3>{anime.name}</h3>
              <span>{anime.data}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodosAnimes;
