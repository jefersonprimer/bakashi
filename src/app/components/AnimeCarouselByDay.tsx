'use client';

import AnimeCarousel from './AnimeCarousel'; // Componente de carrossel existente
import { Anime } from '../../types'; // Tipagem de anime
import animesData from '../../data/animes.json'; // Dados do JSON
import styles from './AnimeCarouselByDay.module.css'; // Estilos específicos
import { useEffect, useState } from 'react';

interface AnimeCarouselByDayProps {
  itemsPerPage?: number; // Número de itens por página (opcional)
  className?: string; // Classe CSS adicional (opcional)
}

const AnimeCarouselByDay: React.FC<AnimeCarouselByDayProps> = ({ itemsPerPage = 5 }) => {
  const [currentDay, setCurrentDay] = useState<string>('');

  // Define o dia atual ao carregar o componente
  useEffect(() => {
    const currentDate = new Date();
    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const currentDayIndex = currentDate.getDay();
    setCurrentDay(daysOfWeek[currentDayIndex]);
  }, []);

  // Filtrar os animes pelo dia atual
  const todaysAnimes: Anime[] = animesData.Animes?.filter((anime) => anime.airing === currentDay) || [];

  if (!currentDay) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={`${styles.dayContainer} anime-carousel-by-day`}>
      <h1 className={styles.titulo}>Animes de Hoje ({currentDay})</h1>
      <p className={styles.subtitulo}>
        Confira os animes que estão sendo exibidos hoje!
      </p>
      {todaysAnimes.length > 0 ? (
        <AnimeCarousel animes={todaysAnimes} itemsPerPage={itemsPerPage} />
      ) : (
        <p className={styles.noAnimes}>Nenhum anime programado para hoje.</p>
      )}
    </div>
  );
};

export default AnimeCarouselByDay;
