'use client'

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Glossary.module.css";

interface Anime {
  id: number;
  name: string;
  slug: string;
  data: string;
  image: string;
  synopsis: string;
  isLancamento: boolean;
}

interface GlossaryProps {
  animes: Anime[];
}

export default function Glossary({ animes }: GlossaryProps) {
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const glossaryRef = useRef<HTMLDivElement>(null);

  // Função para filtrar animes pela letra
  const handleLetterClick = (letter: string) => {
    if (activeLetter === letter) {
      setFilteredAnimes([]);
      setActiveLetter(null);
    } else {
      const filtered =
        letter === "#"
          ? animes
          : animes.filter((anime) =>
              anime.name.toLowerCase().startsWith(letter.toLowerCase())
            );
      setFilteredAnimes(filtered);
      setActiveLetter(letter);
    }
  };

  // Detecta clique fora do glossário
  const handleClickOutside = (event: MouseEvent) => {
    if (glossaryRef.current && !glossaryRef.current.contains(event.target as Node)) {
      setFilteredAnimes([]);
      setActiveLetter(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.letter_home} ref={glossaryRef}>
      <div className={styles.fixresp}>
        <ul className={styles.glossary}>
          {["#", ...Array.from("abcdefghijklmnopqrstuvwxyz")].map((char, index) => (
            <li key={index}>
              <a
                className={`${styles.lglossary} ${
                  activeLetter === char ? styles.active : ""
                }`}
                data-type="all"
                data-glossary={char}
                onClick={() => handleLetterClick(char)}
              >
                {char.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {filteredAnimes.length > 0 && (
        <div className={styles.carouselOverlay}>
          <div className={styles.carousel}>
            {filteredAnimes.map((anime) => (
              <Link key={anime.id} href={`/animes/${anime.slug}`}>
                <div className={styles.anime_card}>
                  <img
                    src={anime.image}
                    alt={anime.name}
                    className={styles.anime_image}
                  />
                  <div className={styles.anime_details}>
                    <h3>{anime.name}</h3>
                    <p>
                      <strong>Data:</strong> {anime.data}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
