"use client";

import { useEffect, useState } from "react";
import AnimeCarousel from "./AnimeCarousel";
import useFetchAnimes from "@/app/hooks/useFetchAnimes"; // Atualize o caminho conforme necessário.
import { Anime } from "../../../types/anime";
import styles from "./AnimeCarouselByDay.module.css";

interface AnimeCarouselByDayProps {
  itemsPerPage?: number;
  className?: string;
}

const AnimeCarouselByDay: React.FC<AnimeCarouselByDayProps> = ({
  itemsPerPage = 5,
}) => {
  const { animes, loading, error } = useFetchAnimes();
  const [currentDay, setCurrentDay] = useState<string>("");

  // Define o dia atual ao carregar o componente
  useEffect(() => {
    const currentDate = new Date();
    const daysOfWeek = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const currentDayIndex = currentDate.getDay();
    setCurrentDay(daysOfWeek[currentDayIndex]);
  }, []);

  // Filtrar os animes pelo dia atual
  const todaysAnimes: Anime[] =
    animes?.filter((anime) => anime.airingDay === currentDay) || [];

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
