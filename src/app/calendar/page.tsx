'use client';

import { useState } from 'react';
import styles from './calendar.module.css';

// Importando os dados diretamente do arquivo JSON
import animesData from '../../data/animes.json';

interface Anime {
  id: number;
  name: string;
  slug: string;
  image: string;
  airing: string;
}

const CalendarPage = () => {
  // Definindo os dias da semana
  const daysOfWeek = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

  // Função para obter o dia da semana atual
  const getCurrentDay = () => {
    const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Retorna o dia da semana (0 = Domingo, 1 = Segunda-feira, etc)
    return days[(currentDay + 6) % 7]; // Ajusta para que Domingo seja o último e Segunda seja o primeiro
  };

  // Função para agrupar os animes por dia de exibição (airing)
  const groupAnimesByDay = () => {
    const groupedAnimes: { [key: string]: Anime[] } = {};

    // Agrupar animes pelo dia de exibição (airing)
    animesData.Animes.forEach((anime: Anime) => {
      const day = anime.airing;
      if (!groupedAnimes[day]) {
        groupedAnimes[day] = [];
      }
      groupedAnimes[day].push(anime);
    });

    return groupedAnimes;
  };

  // Agrupar animes pelos dias da semana
  const groupedAnimes = groupAnimesByDay();
  
  // Obter o dia atual para destacar
  const currentDay = getCurrentDay();

  // Ordenar os dias da semana com o dia atual no topo
  const orderedDays = [
    currentDay, 
    ...daysOfWeek.filter(day => day !== currentDay)
  ];

  return (
    <div className={styles.calendar}>
      <h1>Calendário</h1>
      {orderedDays.map((day) => {
        // Pega os animes que estão exibindo no dia atual
        const dayAnimes = groupedAnimes[day] || [];

        return (
          <div key={day} className={styles.dayContainer}>
            <h2>{day}</h2>
            <div className={styles.animesGrid}>
              {/* Exibir até 5 animes, ou mais se o botão "Mostrar mais" for clicado */}
              {dayAnimes.slice(0, 5).map((anime) => (
                <div key={anime.id} className={styles.animeCard}>
                  <img src={anime.image} alt={anime.name} className={styles.animeImage} />
                  <h3>{anime.name}</h3>
                </div>
              ))}
            </div>
            {/* Mostrar o botão "Mostrar mais" apenas se houver mais de 5 animes */}
            {dayAnimes.length > 5 && (
              <button className={styles.showMoreBtn}>
                Mostrar mais
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarPage;
