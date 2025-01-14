"use client";

import AnimeCarousel from "./AnimeCarousel"; // Componente de carrossel para exibir os animes
import { Anime } from "@/types/anime"; // Tipagem de anime
import animesData from "@/data/animes.json"; // Dados do JSON com os animes
import styles from "./AnimeCarouselDub.module.css"; // Estilos para o componente

interface AnimeCarouselDubProps {
  itemsPerPage?: number; // Número de itens por página (opcional)
  className?: string; // Classe CSS adicional (opcional)
}

const AnimeCarouselDub: React.FC<AnimeCarouselDubProps> = ({
  itemsPerPage = 5,
  className = "",
}) => {
  // Filtrar animes com áudio que contenham "Dub" ou "Dublado"
  const animesWithDub: Anime[] =
    animesData.Animes?.filter((anime) =>
      anime.audioType.match(/\b(Dub|Dublado)\b/i)
    ) || [];

  return (
    <div className={`${styles.audioTypeContainer} ${className}`}>
      <h1 className={styles.titulo}>Dublagens em português</h1>
      <p className={styles.subtitulo}>
        Descubra os animes disponíveis com áudio dublado!
      </p>
      <AnimeCarousel animes={animesWithDub} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselDub;
