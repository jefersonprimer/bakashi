"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./AnimeCarouselFullScreen.module.css";
import animesData from "@/data/animes.json";
import { Anime } from "@/types/anime";
import MaturityRating from "../elements/MaturityRating";

interface AnimeCarouselFullScreenProps {
  animes: Anime[];
  className?: string; // Propriedade opcional
}

const AnimeCarouselFullScreen: React.FC<AnimeCarouselFullScreenProps> = ({
  animes,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const thumbnailAnimes = animes.filter((anime) => anime.isThumbnail);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnailAnimes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [thumbnailAnimes.length]);

  const nextPage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnailAnimes.length);
  };

  const prevPage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + thumbnailAnimes.length) % thumbnailAnimes.length
    );
  };

  const navigateToPage = (index: number) => {
    setCurrentIndex(index);
  };

  if (!animes || thumbnailAnimes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.carouselContainer}>
      <div
        className={styles.backgroundImage}
        style={{
          backgroundImage: `url("http://localhost:3000${thumbnailAnimes[currentIndex].thumbnailImage}")`,
        }}
        
      />

      <div className={styles.cardContainer}>
        <div className={styles.cardContent}>
          <div className={styles.leftColumn}>
            <MaturityRating rating={thumbnailAnimes[currentIndex].rating} />{" "}
            {thumbnailAnimes[currentIndex].audioType}{" "}
            {thumbnailAnimes[currentIndex].genres.join(", ")}
            <p className={styles.name}>{thumbnailAnimes[currentIndex].name}</p>
            <p className={styles.synopsis}>
              {thumbnailAnimes[currentIndex].synopsis}
            </p>
            <div className={styles.buttonsContainer}>
              <button className={styles.playButton}>
                <div className={styles.tooltip}>
                  <span className={styles.tooltipText}>Play</span>
                  <div className={styles.playButtonContent}>
                    <svg
                      className={styles.iconPlay}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      role="img"
                      aria-labelledby="play-title"
                    >
                      <title id="play-title">Play</title>
                      <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
                    </svg>
                  </div>
                </div>
                <span>comeca a assistir</span>
              </button>

              <div className={styles.buttonBookmark}>
                <div className={styles.tooltip}>
                  <span className={styles.tooltipText}>Add to Watchlist</span>
                  <svg
                    className={styles.iconBookmark}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-labelledby="watchlist-svg"
                    role="img"
                  >
                    <title id="watchlist-svg">Watchlist</title>
                    <path d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.pageIndicator}>
          {thumbnailAnimes.map((anime, index) => (
            <button
              key={anime.id}
              className={`${styles.pageDot} ${
                currentIndex === index ? styles.active : ""
              }`}
              onClick={() => navigateToPage(index)}
            >
              <span className={styles.pageLoader}></span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.navigationButtons}>
        <button
          className={styles.arrowButton}
          onClick={prevPage}
          aria-label="Previous Item"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          className={styles.arrowButton}
          onClick={nextPage}
          aria-label="Next Item"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default AnimeCarouselFullScreen;