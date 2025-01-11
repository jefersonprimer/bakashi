"use client";

import { useState, useEffect } from "react";
import AnimeCarouselFullScreen from "./components/cards/AnimeCarouselFullScreen";

import animesData from "../data/animes.json"; 
import { Anime } from "../types/anime"; 
import "./globals.css";
import AnimeCarouselLancamentos from './components/cards/AnimeCarouselLancamentos';
import AnimeCarouselByDay from "./components/cards/AnimeCarouselByDay";

const HomePage = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    const transformedAnimes = animesData.animes.map((anime) => ({
      ...anime,
      rating: Number(anime.rating), 
      score: Number(anime.score),
      genres: anime.genres as Genre[],
      airingDay: anime.airingDay as AiringDay,
    })) as Anime[];

    setAnimes(transformedAnimes); 
  }, []);

  console.log("Animes carregados:", animes); // Debug

  return (
    <div className="home-container">
      <AnimeCarouselFullScreen
        animes={animes}
        className="anime-carousel-fullscreen"
      />
      <AnimeCarouselLancamentos className="anime-carousel-lancamentos" />
      <AnimeCarouselByDay />
      <div>
        <h1>Ainda está procurando algo pra assistir?</h1>
        <p>Confira o nosso acervo completo</p>
        <a href="./animes">VER TUDO</a>
      </div>
    </div>
  );
};

export default HomePage;
