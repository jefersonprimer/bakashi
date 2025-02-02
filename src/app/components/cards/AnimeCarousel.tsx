"use client";

import styles from "./AnimeCarousel.module.css";
import AnimeCard from "./AnimeCard";
import { Anime } from "@/types/anime";

import { useRef, useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";


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
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  const scrollLeft = () => containerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => containerRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  useEffect(() => {
    updateScrollState();
    const handleResize = () => updateScrollState();

    const container = containerRef.current;
    if (container) container.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", handleResize);

    return () => {
      if (container) container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.carouselContainer}>
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className={`${styles.scrollButton} ${styles.scrollLeft}`}
          aria-label="Scroll Left"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}

      <div className={styles.flexContainer} ref={containerRef}>
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className={`${styles.scrollButton} ${styles.scrollRight}`}
          aria-label="Scroll Right"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  );
};

export default AnimeCarousel;
