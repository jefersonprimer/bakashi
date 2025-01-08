'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import styles from "./TodosAnimes.module.css";

// Interface para Anime
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
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Índice do card atual
  const cardsPerPage = 7; // Número de animes por vez a serem exibidos

  // Função para navegar para o próximo card
  const handleNext = () => {
    if (currentCardIndex < todosAnimes.length - cardsPerPage) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  // Função para navegar para o card anterior
  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  // Função de clique no card para abrir o anime
  const handleCardClick = (slug: string) => {
    router.push(`/animes/${slug}`);
  };

  // Função para ver todos os animes
  const handleSeeAllClick = () => {
    router.push('/animes'); // Redireciona para a página de todos os animes
  };

  // Slice dos animes que devem ser exibidos (7 por vez)
  const currentAnimes = todosAnimes.slice(currentCardIndex, currentCardIndex + cardsPerPage);

  return (
    <div>
      <header className={styles.header}>
        <h2>Animes Online</h2>
        <div className={styles.navItems}>
          <div className={styles.leftContent}>
            <span>{todosAnimes.length}</span>
            <button onClick={handleSeeAllClick} className={styles.seeAll}>
              Ver todos
            </button>
          </div>

          {/* Botões de navegação */}
          <button
            className={`${styles.btn} ${styles.prev}`}
            onClick={handlePrev}
            disabled={currentCardIndex === 0} // Desabilita se estiver no primeiro conjunto de 7 animes
          >
            <i className="fas fa-caret-left"></i>
          </button>
          <button
            className={`${styles.btn} ${styles.next}`}
            onClick={handleNext}
            disabled={currentCardIndex + cardsPerPage >= todosAnimes.length} // Desabilita se não houver mais animes
          >
            <i className="fas fa-caret-right"></i>
          </button>
        </div>
      </header>

      <div className={styles.cardContainer}>
        {currentAnimes.map((anime) => (
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
              {anime.isLancamento && (
                <div className={styles.label}>LANÇAMENTO</div>
              )}
              <div className={styles.playButton}>
                <FontAwesomeIcon icon={faPlay} className={styles.playIcon} />
              </div>
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
