'use client';

import React from "react";
import styles from "./Episodios.module.css";

// Interface do Episódio
interface Episodio {
  id: number;
  anime: string;
  episode: number;
  image: string;
  releaseDate: string;
  isLancamento: boolean;
}

// Props do componente
interface EpisodiosProps {
  episodios: Episodio[];
}

const Episodios: React.FC<EpisodiosProps> = ({ episodios }) => {
  // Ordena os episódios pelos mais recentes
  const sortedEpisodios = [...episodios].sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );

  return (
    <div>
      <header className={styles.header}>
        <h2 className={styles.title}>Episódios</h2>
        <span className={styles.total}>
          {episodios.length}{" "}
          <a href="/episodios" className={styles.seeAll}>
            Ver todos
          </a>
        </span>
      </header>
      <div className={styles.gridContainer}>
        {/* Exibindo os episódios (limitados a 20) */}
        {sortedEpisodios.slice(0, 20).map((episodio) => (
          <div key={episodio.id} className={styles.card}>
            <div className={styles.poster}>
              <img
                src={episodio.image}
                alt={`Episódio ${episodio.episode} de ${episodio.anime}`}
                className={styles.posterImg}
              />
              {episodio.isLancamento && (
                <div className={styles.label}>Lançamento</div>
              )}
            </div>
            <div className={styles.info}>
              <h3 className={styles.animeName}>{episodio.anime}</h3>
              <span className={styles.episodeNumber}>
                Episódio {episodio.episode}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Episodios;
