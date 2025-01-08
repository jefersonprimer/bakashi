'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faPlay, faBookmark, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './calendar.module.css';
import animesData from '../../data/animes.json';

interface Anime {
  id: number;
  name: string;
  data: string;
  slug: string;
  image: string;
  score: number;
  rating: string;
  season: number;
  episodes: number;
  synopsis: string;
  airing: string;
}

const CalendarPage = () => {
  const [currentIndexes, setCurrentIndexes] = useState<{ [key: string]: number }>({});
  const [currentDay, setCurrentDay] = useState<string>('');
  const itemsPerPage = 5;

  // Função para agrupar os animes por dia de exibição (airing)
  const groupAnimesByDay = () => {
    const groupedAnimes: { [key: string]: Anime[] } = {};
    animesData.Animes.forEach((anime: Anime) => {
      const day = anime.airing;
      if (!groupedAnimes[day]) {
        groupedAnimes[day] = [];
      }
      groupedAnimes[day].push(anime);
    });
    return groupedAnimes;
  };

  const groupedAnimes = groupAnimesByDay();

  // Função para avançar os cards de um dia específico
  const nextPage = (day: string) => {
    const dayAnimes = groupedAnimes[day] || [];
    const currentIndex = currentIndexes[day] || 0;
    if (currentIndex + itemsPerPage < dayAnimes.length) {
      setCurrentIndexes((prevState) => ({
        ...prevState,
        [day]: currentIndex + itemsPerPage,
      }));
    }
  };

  // Função para voltar os cards de um dia específico
  const prevPage = (day: string) => {
    const dayAnimes = groupedAnimes[day] || [];
    const currentIndex = currentIndexes[day] || 0;
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndexes((prevState) => ({
        ...prevState,
        [day]: currentIndex - itemsPerPage,
      }));
    }
  };

  // Função para calcular o dia da semana atual no cliente
  useEffect(() => {
    const currentDate = new Date();
    const daysOfWeek = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
    const currentDayIndex = currentDate.getDay();
    setCurrentDay(daysOfWeek[(currentDayIndex + 6) % 7]);
  }, []);

  // Se o currentDay ainda não foi definido, mostra o carregamento
  if (!currentDay) {
    return <div>Carregando...</div>;
  }

  const orderedDays = [currentDay, ...['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].filter(day => day !== currentDay)];

  return (
    <div className={styles.calendar}>
      <h1>Calendário</h1>
      {orderedDays.map((day) => {
        const dayAnimes = groupedAnimes[day] || [];
        const currentIndex = currentIndexes[day] || 0;

        return (
          <div key={day} className={styles.dayContainer}>
            <h2>{day}</h2>
            <div className={styles.carouselContainer}>
              {currentIndex > 0 && (
                <button 
                  className={`${styles.arrowButton} ${styles.arrowLeft}`} 
                  onClick={() => prevPage(day)} 
                  disabled={currentIndex === 0}
                  aria-label="Previous Item"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className={styles.arrowIcon} />
                </button>
              )}

              <div className={styles.animesGrid}>
                {dayAnimes.slice(currentIndex, currentIndex + itemsPerPage).map((anime) => (
                  <div key={anime.id} className={styles.animeCard}>
                    <img src={anime.image} alt={anime.name} className={styles.animeImage} />
                    <div className={styles.nomeDataContainer}>
                      <p className={styles.nome}>{anime.name}</p>
                      <p className={styles.data}>{anime.data}</p>
                    </div>

                    <div className={styles.cardInfo}>
                      <h3 className={styles.name}>{anime.name}</h3>
                      <p className={styles.infoText}><span className={styles.ratingNumber}>{anime.rating}</span> {anime.score} <FontAwesomeIcon icon={faStar} className={styles.iconStar}/></p>
                      <p className={`${styles.infoText} ${styles.seasonText}`}>Season: {anime.season}</p>
                      <p className={`${styles.infoText} ${styles.episodesText}`}>Episódios: {anime.episodes}</p>
                      <p className={`${styles.infoText} ${styles.synopsis}`}>{anime.synopsis}</p>
                    </div>

                    <div className={styles.playButton}>
                      <div className={styles.tooltip}>
                        <span className={styles.tooltipText}>Play</span>
                        <FontAwesomeIcon 
                          icon={faPlay} 
                          className={styles.iconPlay}
                        />
                      </div>
                      <div className={styles.tooltip}>
                        <span className={styles.tooltipText}>Add to Watchlist</span>
                        <FontAwesomeIcon 
                          icon={faBookmark} 
                          className={styles.iconBookmark}
                        />
                      </div>
                      <div className={styles.tooltip}>
                        <span className={styles.tooltipText}>Add to Primerlist</span>
                        <FontAwesomeIcon 
                          icon={faPlus} 
                          className={styles.iconPlus}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {currentIndex + itemsPerPage < dayAnimes.length && (
                <button 
                  className={`${styles.arrowButton} ${styles.arrowRight}`} 
                  onClick={() => nextPage(day)} 
                  disabled={currentIndex + itemsPerPage >= dayAnimes.length}
                  aria-label="Next Item"
                >
                  <FontAwesomeIcon icon={faChevronRight} className={styles.arrowIcon} />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarPage;
