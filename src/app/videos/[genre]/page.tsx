// src/app/videos/[genre]/page.tsx

import React from 'react';
import { Anime } from '@/types/anime';
import animesData from '@/data/animes.json';
import AnimeCarousel from '../../components/cards/AnimeCarousel';

const genreMapping: Record<string, string> = {
  action: "Ação",
  adventure: "Aventura",
  comedy: "Comédia",
  drama: "Drama",
  fantasy: "Fantasia",
  historical: "Histórico",
  "post-apocalyptic": "Pós-Apocalíptico",
  "sci-fi": "Ficção Científica",
  supernatural: "Sobrenatural",
  thriller: "Suspense",
};

interface GenrePageProps {
  params: { genre: string };
}

const GenrePage: React.FC<GenrePageProps> = ({ params }) => {
  const genre = params.genre;
  const genreInPortuguese = genreMapping[genre];

  if (!genreInPortuguese) {
    return <p>Gênero "{genre}" não encontrado.</p>;
  }

  // Filtra os animes pelo gênero selecionado
  const filteredAnimes = animesData.animes.filter((anime: Anime) =>
    anime.genres.includes(genreInPortuguese)
  );

  // Filtra os animes populares e de novas estreias
  const popularAnimes = filteredAnimes.filter((anime) => anime.isPopular);
  const newReleasesAnimes = filteredAnimes.filter((anime) => anime.newReleases);

  // Filtra os outros gêneros
  const otherGenresAnimes = Object.entries(genreMapping)
    .filter(([key]) => key !== params.genre)
    .map(([key, value]) => {
      const otherGenreAnimes = animesData.animes.filter((anime) =>
        anime.genres.includes(value)
      );
      return { genre: value, animes: otherGenreAnimes };
    });

  return (
    <div>
      <h1>Animes de {genreInPortuguese}</h1>

      {/* Anime Carousel para Populares */}
      {popularAnimes.length > 0 && (
        <div>
          <h3>Populares</h3>
          <AnimeCarousel animes={popularAnimes.slice(0, 2)} />
        </div>
      )}

      {/* Anime Carousel para Novidades */}
      {newReleasesAnimes.length > 0 && (
        <div>
          <h3>Novidades</h3>
          <AnimeCarousel animes={newReleasesAnimes.slice(0, 2)} />
        </div>
      )}

      {/* Carrosséis para os outros gêneros */}
      <div>
        {otherGenresAnimes.map(({ genre, animes }) => (
          <div key={genre}>
            <h3>Outros Animes de {genre}</h3>
            <AnimeCarousel animes={animes} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
