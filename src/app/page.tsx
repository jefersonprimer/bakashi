"use client";

import { useState, useEffect } from "react";

import AnimeCarouselFullScreen from "./components/cards/AnimeCarouselFullScreen";
import AnimeCarouselLancamentos from './components/cards/AnimeCarouselLancamentos';

import { Anime, Genre, AiringDay } from "../types/anime"; 
import animesData from "@/data/animes.json"; 

import "./globals.css";
import AnimeCarouselByDay from "./components/cards/AnimeCarouselByDay";
import OutdoorCard from "./components/cards/OutdoorCard";
import Outdoor from "./components/cards/Outdoor";

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

  console.log("Animes carregados:", animes); // TODO: Debug

  return (
    <div className="home-container">
      <AnimeCarouselFullScreen />
      <AnimeCarouselLancamentos className="anime-carousel-lancamentos" />
    </div>
  );
};

export default HomePage;