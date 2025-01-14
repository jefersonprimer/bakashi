// src/app/popular/page.tsx
import { Anime } from "@/types/anime";
import AnimeCarousel from "../../components/cards/AnimeCarousel";

// Supondo que o JSON seja carregado a partir de um arquivo local ou uma API
import animesData from "@/data/animes.json"; // ou use fetch se for uma API

async function getPopularAnimes() {
  // Aqui estamos filtrando os animes que possuem isPopular === true
  const filteredAnimes = animesData.animes.filter((anime: Anime) => anime.isPopular === true);
  return filteredAnimes;
}

const PopularPage = async () => {
  const animes = await getPopularAnimes(); // Carrega os animes populares

  return (
    <div>
      <h1>Animes Populares</h1>
      <AnimeCarousel animes={animes} />
    </div>
  );
};

export default PopularPage;
