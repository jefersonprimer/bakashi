"use client";

import useFetchAnimes from "@/app/hooks/useFetchAnimes";
import { Anime } from "../../../types/anime";
import AnimeCarousel from "./AnimeCarousel";
import styles from "./AnimeCarouselByDay.module.css";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";

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
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!currentDay) {
    return <Loading />;
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
