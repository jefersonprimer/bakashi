'use client';

import "./globals.css";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ListsProvider } from "./contexts/ListsContext";

import AnimeCarouselFullScreen from "./components/cards/AnimeCarouselFullScreen";
import AnimeCarouselLancamentos from './components/cards/AnimeCarouselLancamentos';
import AnimeCarouselByDay from "./components/cards/AnimeCarouselByDay";
import AnimeCarouselDub from "./components/cards/AnimeCarouselDub";
import AnimeCarouselNextSeason from "./components/cards/AnimeCarouselNextSeason";
import AnimeCarouselPopular from "./components/cards/AnimeCarouselPopular";
import AnimeCarouselPopularSeason from "./components/cards/AnimeCarouselPopularSeason";
import MovieCard from "./components/cards/MovieCard";

import Episodios from "./components/cards/Episodios";
import OutdoorCard from "./components/cards/OutdoorCard"; 
import Outdoor from "./components/cards/Outdoor";
import FavoritesCarousel from "./components/cards/FavoritesCarousel";

import { useFavorites } from "./contexts/FavoritesContext";
import HistoryCarousel from "./components/cards/HistoryCarousel";
import { HistoryProvider, useHistory } from "./contexts/HistoryContext"; 

const HomePage = () => {
  return (
    <FavoritesProvider>
      <ListsProvider>
        <div className="home-container">
          <AnimeCarouselFullScreen />
          <AnimeCarouselLancamentos className="anime-carousel-lancamentos" />

          <HistoryProvider>
            <HistorySection />
          </HistoryProvider>

           {/* OutdoorCard Component */}
           <div className="outdoor-container">
            <OutdoorCard
              link="https://www.crunchyroll.com/pt-br/series/G9VHN9QXQ/unnamed-memory"
              imageUrl="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/CurationAssets/Anyway%20I'm%20Falling%20in%20Love%20with%20You/SEASON%201/MARKETING%20BANNER/AnywayImFallinginLoveWithYou-S1-KV1-Banner-2100x700-PT.png"
            />
          </div>

          <AnimeCarouselByDay className="anime-carousel-by-day"/>
          <AnimeCarouselPopularSeason className="anime-carousel-popular-season"/>
          <AnimeCarouselPopular className="anime-carousel-popular" />
          <AnimeCarouselNextSeason className="anime-carousel-next-season"/>
          <AnimeCarouselDub className="anime-carousel-dub"/>
          <MovieCard className="movie-card"/>

          {/* Outdoor Component */}
          <Outdoor 
            imageUrl="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/CurationAssets/HeadhuntedToAnotherWorld-S1C1-KV2-Banner-2100x700-PT.png"
            title="Dr. Stone"
            audiotype="Dub | Leg"
            description="Milhares de anos após um misterioso fenômeno transformar a humanidade inteira em pedra, desperta um garoto extraordinariamente inteligente e motivado pela ciência - Senku Ishigami. Diante de um mundo de pedra e do colapso generalizado da civilização, Senku decide usar sua..."
            buttonLink="https://www.crunchyroll.com/pt-br/series/G9VHN9QXQ/unnamed-memory"
            addToQueueLink="#"
          />

          <div className="favorites-section">
            <FavoritesSection /> 
          </div>

          <div className="episodios-card">
            <Episodios/>
          </div>

          {/* OutdoorCard Component */}
          <div className="outdoor-container">
            <OutdoorCard
              link="https://www.crunchyroll.com/pt-br/series/G9VHN9QXQ/unnamed-memory"
              imageUrl="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=2700/CurationAssets/HeadhuntedToAnotherWorld-S1C1-KV2-Banner-2100x700-PT.png"
            />
          </div>

        </div>
      </ListsProvider>

      <div className="container--cq5XE">
        <div className="erc-view-all-feed-section">
          <img 
            className="view-all-feed-image" 
            src="https://www.crunchyroll.com/build/assets/img/home/yuzu.png" 
            srcSet="https://www.crunchyroll.com/build/assets/img/home/yuzu@2x.png 2x" 
            alt="Yuzu." 
          />
          <h3 className="heading">
            Ainda está procurando algo pra assistir? <br/>
            Confira o nosso acervo completo
          </h3>
          <a 
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
    </FavoritesProvider>
  );
};

// Verifica o histórico antes de renderizar o componente
const HistorySection = () => {
  const { history } = useHistory(); // Pega o histórico do contexto

  if (history.length === 0) {
    return null; // Não renderiza o HistoryCarousel se não houver episódios no histórico
  }

  return <HistoryCarousel />;
};

const FavoritesSection = () => {
  const { favorites } = useFavorites(); // Agora está dentro do provider, funciona corretamente

  return (
    <>
      {favorites.length > 0 && <FavoritesCarousel />}
    </>
  );
};

export default HomePage;
