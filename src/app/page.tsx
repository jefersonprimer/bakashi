"use client";

// src/app/page.tsx ou src/pages/index.tsx

import { useState, useEffect } from "react";
import AnimeCarouselFullScreen from "./components/cards/AnimeCarouselFullScreen"; // Importa o componente de carrossel
import animesData from "../data/animes.json"; // Importa os dados JSON
import { Anime } from "../types/anime"; // Importa a tipagem do Anime
import "./globals.css"; // Estilos globais
import AnimeCarouselLancamentos from "./components/cards/AnimeCarouselLancamentos";
import AnimeCarouselNextSeason from "./components/cards/AnimeCarouselNextSeason";
import AnimeCarouselByDay from "./components/cards/AnimeCarouselByDay";
import Episodios from "./components/cards/Episodios";
import AnimeCarouselTodos from "./components/cards/AnimeCarouselTodos";

const HomePage = () => {
  // Tipagem do estado 'animes' como 'Anime[]'
  const [animes, setAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    setAnimes(animesData.Animes); // Define os animes do JSON
  }, []);

  return (
    <div className="home-container">
      {/* Passa os dados dos animes para o AnimeCarouselFullScreen */}
      <AnimeCarouselFullScreen
        animes={animes}
        className="anime-carousel-fullscreen"
      />
      {/* <AnimeCarouselLancamentos className="anime-carousel-lancamentos" />
      <AnimeCarouselByDay />
      <AnimeCarouselNextSeason />
      <AnimeCarouselTodos />
      <Episodios /> */}
      <div>
        <img src="https://www.crunchyroll.com/build/assets/img/home/yuzu.png" />
        <h1>Ainda está procurando algo pra assistir?</h1>
        <p>Confira o nosso acervo completo</p>
        <a href="./animes">VER TUDO</a>
      </div>
    </div>
  );
};

export default HomePage;
