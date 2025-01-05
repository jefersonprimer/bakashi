'use client';

import React, { useState } from "react";
import styles from "./Lancamentos.module.css";
import Link from 'next/link';

// Interface do Anime (com base no seu JSON)
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

// Props para o componente Lancamentos
interface LancamentosProps {
  lancamentos: Anime[];
}

const Lancamentos: React.FC<LancamentosProps> = ({ lancamentos }) => {
  // Se não houver lançamentos, exibe uma mensagem
  if (!lancamentos || lancamentos.length === 0) {
    return <div>Sem lançamentos disponíveis</div>;
  }

  // Filtra apenas os lançamentos
  const lancamentosEmDestaque = lancamentos.filter((anime) => anime.isLancamento);

  // Estado para controlar o índice atual
  const [currentIndex, setCurrentIndex] = useState(0); // Começa do anime 0 (primeiro anime)
  const maxCardsPerPage = 7; // Mostrar 7 animes por vez

  // Funções de navegação
  const handleNext = () => {
    if (currentIndex < lancamentosEmDestaque.length - maxCardsPerPage) {
      setCurrentIndex(prev => prev + 1); // Avança 1 anime
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1); // Retrocede 1 anime
    }
  };

  // Exibe os animes a partir do índice atual
  const currentCards = lancamentosEmDestaque.slice(currentIndex, currentIndex + maxCardsPerPage);

  return (
    <div>
      <header className={styles.header}>
        <h2>Lançamentos</h2>
        <div className={styles.navItems}>
          <button
            className={`${styles.btn} ${styles.prev}`}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <i className="fas fa-caret-left"></i>
          </button>
          <button
            className={`${styles.btn} ${styles.next}`}
            onClick={handleNext}
            disabled={currentIndex >= lancamentosEmDestaque.length - maxCardsPerPage}
          >
            <i className="fas fa-caret-right"></i>
          </button>
        </div>
      </header>

      <div className={styles.cardContainer}>
        {currentCards.map((anime) => (
          <Link key={anime.id} href={`/animes/${anime.slug}`}>
            <div className={styles.card}>
            <div className={styles.poster}>
              <img
                src={anime.image}
                alt={anime.name}
                className={styles.posterImg}
              />
              {/* A label LANÇAMENTO sempre vai ser visível */}
              <div className={styles.label}>LANÇAMENTO</div>
            </div>
            <div className={styles.info}>
              <h3>{anime.name}</h3>
              <p><strong>Data:</strong> {anime.data}</p>
              <p><strong>Nota:</strong> {anime.score}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Lancamentos;
