'use client';

import AnimeCarousel from './AnimeCarousel'; // Componente de carrossel existente
import { Anime } from '../../types'; // Tipagem de anime
import animesData from '../../data/animes.json'; // Dados do JSON
import styles from './AnimeCarouselNextSeason.module.css'; // Estilos específicos

interface AnimeCarouselNextSeasonProps {
  itemsPerPage?: number; // Número de itens por página (opcional)
  className?: string; // Classe CSS adicional (opcional)
}

const AnimeCarouselNextSeason: React.FC<AnimeCarouselNextSeasonProps> = ({ itemsPerPage = 5 }) => {
  // Filtrar os animes que são da próxima temporada
  const nextSeasonAnimes: Anime[] = animesData.Animes?.filter((anime) => anime.isNextSeason) || [];

  return (
    <div className={`${styles.nextSeasonContainer} anime-carousel-next-season`}>
      <h1 className={styles.titulo}>Animes da Próxima Temporada</h1>
      <p className={styles.subtitulo}>
        Confira os animes mais esperados para a próxima temporada!
      </p>
      <AnimeCarousel animes={nextSeasonAnimes} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselNextSeason;
