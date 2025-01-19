import React from 'react';
import { Anime } from '@/types/anime';
import animesData from '@/data/animes.json';
import AnimeCarouselGenre from '../../components/cards/AnimeCarouselGenre';
import styles from './styles.module.css'

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
    <div className={styles.mainContainer}>
      <h1 className={styles.mainTitle}>Animes de {genreInPortuguese}</h1>

      {/* AnimeCarousel para Populares */}
      {popularAnimes.length > 0 && (
        <div>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Populares</h3>
            <h3 className={styles.viewAll}>VER TODOS</h3>
          </div>
          <AnimeCarouselGenre animes={popularAnimes} />
        </div>
      )}

      {/* AnimeCarousel para Novidades */}
      {newReleasesAnimes.length > 0 && (
        <div>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Novidades</h3>
            <h3 className={styles.viewAll}>VER TODOS</h3>
          </div>
          <AnimeCarouselGenre animes={newReleasesAnimes} />
        </div>
      )}

      {/* AnimeCarousel para os outros gêneros */}
      <div>
        {otherGenresAnimes.map(({ genre, animes }) => (
          <div key={genre}>
            <div className={styles.sectionHeader}>
              <h3>{genre}</h3>
              <h3 className={styles.viewAll}>VER TODOS</h3>
            </div>
            <AnimeCarouselGenre animes={animes} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
