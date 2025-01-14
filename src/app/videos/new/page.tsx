// src/app/new-releases/page.tsx
import { Anime } from "@/types/anime";
import AnimeCarousel from "../../components/cards/AnimeCarousel";

// Supondo que o JSON seja carregado a partir de um arquivo local ou uma API
import animesData from "@/data/animes.json"; // ou use fetch se for uma API

async function getNewReleases() {
  // Aqui estamos filtrando os animes diretamente no lado do servidor (sem usar getServerSideProps)
  const filteredAnimes = animesData.animes.filter((anime: Anime) => anime.newReleases === true);
  return filteredAnimes;
}

const NewReleasesPage = async () => {
  const animes = await getNewReleases(); // Carrega os animes filtrados

  return (
    <div>
      <h1>Novos Lançamentos</h1>
      <AnimeCarousel animes={animes} />
    </div>
  );
};

export default NewReleasesPage;
