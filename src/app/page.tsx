'use client'

import { useState, useEffect } from "react";
import AnimeCarouselFullScreen from "./components/cards/AnimeCarouselFullScreen";
import AnimeCarouselLancamentos from './components/cards/AnimeCarouselLancamentos';
import { Anime, Genre, AiringDay } from "../types/anime"; 
import animesData from "@/data/animes.json"; 
import "./globals.css";
import AnimeCarouselByDay from "./components/cards/AnimeCarouselByDay";
import OutdoorCard from "./components/cards/OutdoorCard"; // Importando o componente OutdoorCard
import Outdoor from "./components/cards/Outdoor";
import Episodios from "./components/cards/Episodios";

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
      
      {/* Outdoor Component */}
      <Outdoor 
        imageUrl="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/CurationAssets/HeadhuntedToAnotherWorld-S1C1-KV2-Banner-2100x700-PT.png"
        title="Unnamed Memory"
        audiotype="Anime"
        description="A thrilling story of magic, mystery, and fate unfolds in this anime."
        buttonText="Saiba mais"
        buttonLink="https://www.crunchyroll.com/pt-br/series/G9VHN9QXQ/unnamed-memory"
        addToQueueText="Adicionar à Fila"
        addToQueueLink="#"
      />

      <Episodios/>

      {/* OutdoorCard Component */}
      <div className="outdoor-container">
        <OutdoorCard
          link="https://www.crunchyroll.com/pt-br/series/G9VHN9QXQ/unnamed-memory"
          imageUrl="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/CurationAssets/HeadhuntedToAnotherWorld-S1C1-KV2-Banner-2100x700-PT.png"
        />
      </div>
    </div>
  );
};

export default HomePage;
