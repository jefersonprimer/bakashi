'use client';

import { useState, useEffect } from "react";
import { Anime, Genre, AiringDay } from "../types/anime"; 
import AnimeCarouselFullScreen from "./components/cards/AnimeCarouselFullScreen";
import AnimeCarouselLancamentos from './components/cards/AnimeCarouselLancamentos';
import animesData from "@/data/animes.json"; 
import AnimeCarouselByDay from "./components/cards/AnimeCarouselByDay";
import OutdoorCard from "./components/cards/OutdoorCard"; 
import Outdoor from "./components/cards/Outdoor";
import Episodios from "./components/cards/Episodios";
import AnimeCarouselDub from "./components/cards/AnimeCarouselDub";
import AnimeCarouselNextSeason from "./components/cards/AnimeCarouselNextSeason";
import AnimeCarouselPopular from "./components/cards/AnimeCarouselPopular";
import AnimeCarouselPopularSeason from "./components/cards/AnimeCarouselPopularSeason";
import MovieCard from "./components/cards/MovieCard";
import "./globals.css";
import { AnimeListProvider } from "./contexts/AnimeListContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ListsProvider } from "./contexts/ListsContext";

const HomePage = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    const transformedAnimes = animesData.animes.map((anime) => ({
      ...anime,
      rating: Number(anime.rating), 
      score: Number(anime.score),
      genres: anime.genres as Genre[] ,
      airingDay: anime.airingDay as AiringDay,
    })) as Anime[];

    setAnimes(transformedAnimes); 
  }, []);

  console.log("Animes carregados:", animes);

  return (
    <div className="home-container">
      {/* Envolver os dois providers para garantir que os componentes tenham acesso aos contextos */}
      <FavoritesProvider>
        <AnimeListProvider> {/* Envolva o AnimeListProvider aqui */}
        <ListsProvider>
          <AnimeCarouselFullScreen />
          <AnimeCarouselLancamentos className="anime-carousel-lancamentos" />
          <AnimeCarouselByDay />
          <AnimeCarouselPopularSeason />
          <AnimeCarouselPopular />
          <AnimeCarouselNextSeason />
          <AnimeCarouselDub />
          <MovieCard />
        </ListsProvider>
        
        </AnimeListProvider>
      </FavoritesProvider>

      {/* Outdoor Component */}
      <Outdoor 
        imageUrl="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/CurationAssets/HeadhuntedToAnotherWorld-S1C1-KV2-Banner-2100x700-PT.png"
        title="Dr. Stone"
        audiotype="Dub | Leg"
        description="Milhares de anos após um misterioso fenômeno transformar a humanidade inteira em pedra, desperta um garoto extraordinariamente inteligente e motivado pela ciência - Senku Ishigami. Diante de um mundo de pedra e do colapso generalizado da civilização, Senku decide usar sua..."
        buttonText="Começar a assistir T1 E1"
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

      <div className="container--cq5XE">
        <div className="erc-view-all-feed-section">
          <img 
            className="view-all-feed-image" 
            src="https://www.crunchyroll.com/build/assets/img/home/yuzu.png" 
            srcSet="https://www.crunchyroll.com/build/assets/img/home/yuzu@2x.png 2x" 
            alt="Yuzu." 
          />
          <h3 className="heading">
            Ainda está procurando algo pra assistir? <br />
            Confira o nosso acervo completo
          </h3>
          <a 
            // tabIndex="0" 
            className="button" 
            data-t="view-all-btn" 
            href="/pt-br/videos/popular"
          >
            <span className="viewAll">
              VER TUDO
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
