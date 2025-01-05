'use client';

import { useState } from 'react';
import data from '@/data/animes.json';

interface Anime {
  id: number;
  name: string;
  slug: string;
  data: string;
  image: string;
  synopsis: string;
  isLancamento: boolean;
  rating: string;
  score: number;
  genres: string[];
  airing: string;
  episodes: number;
  season: number;
}

interface Episode {
  id: number;
  animeId: number;
  season: number;
  title: string;
  image: string;
  releaseDate: string;
  isLancamento: boolean;
}

const EpisodesPage = () => {
  const animes: Anime[] = data.Animes;
  const episodes: Episode[] = data.Episodes;

  const [currentPage, setCurrentPage] = useState(1);

  const episodesPerPage = 30;
  const totalPages = Math.ceil(episodes.length / episodesPerPage);

  // Paginação
  const currentEpisodes = episodes.slice(
    (currentPage - 1) * episodesPerPage,
    currentPage * episodesPerPage
  );

  // Retorna o nome do anime correspondente ao `animeId` de cada episódio
  const getAnimeName = (animeId: number) => {
    const anime = animes.find((a) => a.id === animeId);
    return anime ? anime.name : 'Desconhecido';
  };

  return (
    <div>
      <div className="episodes-container">
        <div className="grid">
          {currentEpisodes.length === 0 ? (
            <div>Carregando episódios...</div>
          ) : (
            currentEpisodes.map((episode) => (
              <div key={episode.id} className="episode-card">
                <img src={episode.image} alt={`Episódio ${episode.id}`} />
                <p>{`Episódio ${episode.title.split(' ')[1]}`}</p>
                <p>{`S${episode.season} E${episode.id} / ${episode.releaseDate}`}</p>
                <p>{getAnimeName(episode.animeId)}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Paginação */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EpisodesPage;
