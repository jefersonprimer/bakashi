"use client";

import { useRef, useState, useEffect } from "react";
import { Anime } from "@/types/anime";
import styles from "./AnimeCarousel.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";
import MaturityRating from "../elements/MaturityRating";

interface AnimeCarouselProps {
  animes: Anime[];
}

const AnimeCarousel: React.FC<AnimeCarouselProps> = ({ animes }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

      // Adiciona uma margem de erro para cálculos de scroll
      const isAtStart = scrollLeft <= 0;
      const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;

      setCanScrollLeft(!isAtStart);
      setCanScrollRight(!isAtEnd);
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      updateScrollState(); // Atualiza o estado inicial
      container.addEventListener("scroll", updateScrollState);
      return () => container.removeEventListener("scroll", updateScrollState);
    }
  }, []);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.outer}>
        {/* Botão esquerdo */}
        {canScrollLeft && (
          <button
            className={`${styles.scrollButton} ${styles.scrollLeft}`}
            onClick={scrollLeft}
            aria-label="Scroll Left"
          >
            <FontAwesomeIcon icon={faChevronLeft} className={styles.arrowIcon} />
          </button>
        )}

        {/* Container dos cards */}
        <div className={styles.flexContainer} ref={containerRef}>
          {animes.map((anime) => (
            <div key={anime.id} className={styles.card}>
              <Link href={`/series/${anime.id}/${anime.slug}`} className={styles.animeLink}>
                <img src={anime.image} alt={anime.name} className={styles.animeImage} />
                <div className={styles.nomeDataContainer}>
                  <p className={styles.nome}>{anime.name}</p>
                  <p className={styles.data}>{anime.audioType}</p>
                </div>

                <div className={styles.cardInfo}>
                  <h3 className={styles.name}>{anime.name}</h3>
                  <div className={styles.infoText}>
                    <div className={styles.flexContainer2}>
                      <MaturityRating rating={anime.rating} />
                      <span className={styles.score}>
                        {anime.score}
                        <FontAwesomeIcon icon={faStar} className={styles.iconStar} />
                      </span>
                    </div>
                  </div>

                  <p className={`${styles.infoText} ${styles.seasonText}`}>
                    Season: {anime.season}
                  </p>
                  <p className={`${styles.infoText} ${styles.episodesText}`}>
                    Episódios: {anime.episodes}
                  </p>
                  <p className={`${styles.infoText} ${styles.synopsis}`}>{anime.synopsis}</p>
                </div>

                {/* Botões de Ação (Play, Watchlist, Primerlist) */}
                <div className={styles.playButton}>
                  <div className={styles.tooltip}>
                    <span className={styles.tooltipText}>Play</span>
                    <svg
                      className={styles.iconPlay}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-labelledby="play-svg"
                      aria-hidden="false"
                      role="img"
                    >
                      <title id="play-svg">Play</title>
                      <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
                    </svg>
                  </div>

                  <div className={styles.tooltip}>
                    <span className={styles.tooltipText}>Add to Watchlist</span>
                    <svg
                      className={styles.iconBookmark}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-labelledby="watchlist-svg"
                      aria-hidden="false"
                      role="img"
                    >
                      <title id="watchlist-svg">Watchlist</title>
                      <path d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z" />
                    </svg>
                  </div>

                  <div className={styles.tooltip}>
                    <span className={styles.tooltipText}>Add to Primerlist</span>
                    <svg
                      className={styles.iconPlus}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-labelledby="add-svg"
                      aria-hidden="false"
                      role="img"
                    >
                      <title id="add-svg">Add</title>
                      <path d="M13 3v8h8v2h-8v8h-2v-8H3v-2h8V3z" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Botão direito */}
        {canScrollRight && (
          <button
            className={`${styles.scrollButton} ${styles.scrollRight}`}
            onClick={scrollRight}
            aria-label="Scroll Right"
          >
            <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AnimeCarousel;
