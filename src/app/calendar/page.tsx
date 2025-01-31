"use client";

import styles from "./calendar.module.css";

import { useEffect, useState } from "react";
import useFetchAnimes from "@/app/hooks/useFetchAnimes"; 
import { Anime } from "@/types/anime";
import OldAnimeCarousel from "../components/cards/OldAnimeCarousel"; 

const CalendarPage = () => {
  const { animes, loading, error } = useFetchAnimes();
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    const currentDate = new Date();
    const daysOfWeek = [
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
      "Domingo",
    ];
    const currentDayIndex = currentDate.getDay();
    setCurrentDay(daysOfWeek[(currentDayIndex + 6) % 7]);
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const groupAnimesByDay = () => {
    const groupedAnimes: { [key: string]: Anime[] } = {};
    animes.forEach((anime) => {
      const day = anime.airingDay;
      if (!groupedAnimes[day]) {
        groupedAnimes[day] = [];
      }
      groupedAnimes[day].push(anime);
    });
    return groupedAnimes;
  };

  const groupedAnimes = groupAnimesByDay();
  const orderedDays = [
    currentDay,
    ...[
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
      "Domingo",
    ].filter((day) => day !== currentDay),
  ];

  return (
    <div className={styles.calendar}>
      <h1 className={styles.title}>Calendário</h1>
      {orderedDays.map((day) => {
        const dayAnimes = groupedAnimes[day] || [];
        return (
          <div key={day} className={styles.dayContainer}>
            <h2 className={styles.dayTitle}>{day}</h2>
            <OldAnimeCarousel animes={dayAnimes} itemsPerPage={5} />
          </div>
        );
      })}
    </div>
  );
};

export default CalendarPage;
