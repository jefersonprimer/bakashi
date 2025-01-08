cor audiotype = #9A9A9A
cor hover card = #23252B

<FontAwesomeIcon icon="fa-regular fa-play" />
<FontAwesomeIcon icon="fa-regular fa-bookmark" />
<FontAwesomeIcon icon="fa-solid fa-plus" />

hover
.browse-card-hover__content--aD-bn {
    background: #141519;
    box-shadow: 0 0 0 .5rem #141519;
    display: flex
;
    flex: 0 0 100%;
    flex-direction: column;
    position: relative;
}


botoes
<div class="browse-card-hover__footer--oK4Wg cz-color-16777215"><div class="browse-card-hover__footer-icon--lJ3B- cz-color-16777215"><div class="cz-color-16777215"><div class="tooltip-target--pW1cv cz-color-16777215"><button tabindex="0" class="tooltip-icon__action-icon-button--KEDNK cz-color-681215" data-t="play-button"><svg class="tooltip-icon__action-icon--toIky cz-color-681215" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="play-svg" aria-labelledby="play-svg" aria-hidden="false" role="img"><title id="play-svg" class="cz-color-681215">Play</title><path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" class="cz-color-681215"></path></svg></button></div></div></div><div class="browse-card-hover__footer-icon--lJ3B- cz-color-16777215"><div class="tooltip-target--pW1cv cz-color-16777215"><button tabindex="0" class="tooltip-icon__action-icon-button--KEDNK cz-color-681215" data-t="add-to-watchlist-btn"><svg class="tooltip-icon__action-icon--toIky cz-color-681215" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="watchlist-svg" aria-labelledby="watchlist-svg" aria-hidden="false" role="img"><title id="watchlist-svg" class="cz-color-681215">Watchlist</title><path d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z" class="cz-color-681215"></path></svg></button></div></div><div class="browse-card-hover__footer-icon--lJ3B- cz-color-16777215"><div class="tooltip-target--pW1cv cz-color-16777215"><button tabindex="0" class="tooltip-icon__action-icon-button--KEDNK cz-color-681215" data-t="add-to-custom-list"><svg class="tooltip-icon__action-icon--toIky cz-color-681215" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="add-svg" aria-labelledby="add-svg" aria-hidden="false" role="img"><title id="add-svg" class="cz-color-681215">Add</title><path d="M13 3v8h8v2h-8v8h-2v-8H3v-2h8V3z" class="cz-color-681215"></path></svg></button></div></div></div>



'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Ícones de Play e setas
import styles from './calendar.module.css';

// Importando os dados diretamente do arquivo JSON
import animesData from '../../data/animes.json';

interface Anime {
  id: number;
  name: string;
  data: string;
  slug: string;
  image: string;
  rating: string;
  season: number;
  episodes: number;
  synopsis: string;
  airing: string;
}

const CalendarPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para controlar o índice do anime visível
  const itemsPerPage = 5; // Número de animes por vez a serem exibidos (5 animes por vez)

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

  // Função para avançar os cards
  const nextPage = (day: string) => {
    const dayAnimes = groupedAnimes[day] || [];
    if (currentIndex + itemsPerPage < dayAnimes.length) {
      setCurrentIndex(currentIndex + itemsPerPage); // Avança para o próximo grupo de animes
    }
  };

  // Função para voltar os cards
  const prevPage = (day: string) => {
    const dayAnimes = groupedAnimes[day] || [];
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage); // Volta para o grupo de animes anterior
    }
  };

  // Definindo os dias da semana
  const daysOfWeek = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

  // Função para obter o dia da semana atual
  const getCurrentDay = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Retorna o dia da semana (0 = Domingo, 1 = Segunda-feira, etc)
    return daysOfWeek[(currentDay + 6) % 7]; // Ajusta para que Domingo seja o último e Segunda seja o primeiro
  };

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
            <div className={styles.carouselContainer}>
              {/* Botão de navegação para a esquerda */}
              {currentIndex > 0 && (
                <button 
                  className={styles.arrowButton} 
                  onClick={() => prevPage(day)} 
                >
                  <FontAwesomeIcon icon={faArrowLeft} className={styles.arrowIcon} />
                </button>
              )}

              <div className={styles.animesGrid}>
                {/* Exibe 5 animes por vez */}
                {dayAnimes.slice(currentIndex, currentIndex + itemsPerPage).map((anime) => (
                  <div key={anime.id} className={styles.animeCard}>
                    <img src={anime.image} alt={anime.name} className={styles.animeImage} />

                    <div className={styles.nomeDataContainer}>
                      <p className={styles.nome}>{anime.name}</p>
                      <p className={styles.data}>{anime.data}</p>
                    </div>

                    <div className={styles.cardInfo}>
                      <h3 className={styles.name}>{anime.name}</h3>
                      <p className={styles.infoText}>Rating: {anime.rating}</p>
                      <p className={styles.infoText}>Season: {anime.season}</p>
                      <p className={styles.infoText}>Episódios: {anime.episodes}</p>
                      <p className={`${styles.infoText} ${styles.synopsis}`}>{anime.synopsis}</p>
                    </div>

                    <div className={styles.playButton}>
                      <FontAwesomeIcon icon={faPlay} className={styles.playIcon} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Botão de navegação para a direita */}
              {currentIndex + itemsPerPage < dayAnimes.length && (
                <button 
                  className={styles.arrowButton} 
                  onClick={() => nextPage(day)} 
                >
                  <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
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
