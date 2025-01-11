"use client";

import { useState, useEffect } from "react";
import styles from "./calendar.module.css";
import animesData from "@/data/animes.json";
import AnimeCarousel from "../components/cards/AnimeCarousel"; 
import { Anime } from "@/types/anime";

const CalendarPage = () => {
  const [currentDay, setCurrentDay] = useState<string>("");

  // Tipando corretamente os dados importados de animesData
  const groupAnimesByDay = () => {
    const groupedAnimes: { [key: string]: Anime[] } = {};
    (animesData as { animes: Anime[] }).animes.forEach((anime) => {
      const day = anime.airingDay; 
      if (!groupedAnimes[day]) {
        groupedAnimes[day] = [];
      }
      groupedAnimes[day].push(anime);
    });
    return groupedAnimes;
  };

  const groupedAnimes = groupAnimesByDay();

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

  if (!currentDay) {
    return <div>Carregando...</div>;
  }

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
      <h1>Calendário</h1>
      {orderedDays.map((day) => {
        const dayAnimes = groupedAnimes[day] || [];
        return (
          <div key={day} className={styles.dayContainer}>
            <h2>{day}</h2>
            <AnimeCarousel animes={dayAnimes} itemsPerPage={5} />
          </div>
        );
      })}
    </div>
  );
};

export default CalendarPage;
