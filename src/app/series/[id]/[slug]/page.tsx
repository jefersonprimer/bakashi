'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './styles.module.css';
import Link from 'next/link';

import { Anime } from '@/types/anime';
import { Episode } from '@/types/episode';
import useFetchAnimes from '../../../hooks/useFetchAnimes'; // Importando o hook de animes
import useFetchEpisodes from '../../../hooks/useFetchEpisodes'; // Importando o hook de episódios
import Image from 'next/image';

const Page = () => {
  const { slug } = useParams();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendations, setRecommendations] = useState<Anime[]>([]);

  // Usando os hooks para obter dados da API
  const { animes, loading: loadingAnimes, error: errorAnimes } = useFetchAnimes();
  const { episodes: allEpisodes, loading: loadingEpisodes, error: errorEpisodes } = useFetchEpisodes();

  useEffect(() => {
    if (slug) {
      const foundAnime = animes.find((anime) => anime.slug === slug);
      if (foundAnime) {
        setAnime(foundAnime);

        const relatedEpisodes = allEpisodes.filter(
          (episode) => episode.animeId === foundAnime.id
        );
        setEpisodes(relatedEpisodes);

        const filteredRecommendations = animes.filter(
          (recAnime) =>
            recAnime.id !== foundAnime.id &&
            recAnime.genres.some((genre) => foundAnime.genres.includes(genre))
        );

        setRecommendations(filteredRecommendations.slice(0, 5));
      }
    }
  }, [slug, animes, allEpisodes]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredEpisodes = episodes.filter((episode) =>
    episode.title.toLowerCase().includes(searchQuery)
  );

  if (loadingAnimes || loadingEpisodes) {
    return <p>Carregando...</p>;
  }

  if (errorAnimes || errorEpisodes) {
    return <p>Erro ao carregar dados: {errorAnimes || errorEpisodes}</p>;
  }

  if (!anime) {
    return <p>Anime não encontrado.</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <div className={styles.sheader}>
          <div className={styles.blur}>
            <div className={styles.poster}>
              <img src={anime.image} alt={anime.name} />
              <span className={styles.mtipoEstrelas}>
                <i className="fas fa-star"></i>
                <span>{anime.score}</span>
              </span>
            </div>
            <div className={styles.data}>
              <h1>{anime.name}</h1>
              <div className={styles.genresContainer}>
                {anime.genres.map((genre) => (
                  <span key={genre} className={styles.genreItem}>
                    {genre}
                  </span>
                ))}
              </div>
              <div className={styles.extra}>
                <h2>Sinopse...</h2>
                <span>{anime.synopsis}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttonsContainer}>
          <button className={styles.actionButton}>Assistir primeiro episódio</button>
          <button className={styles.actionButton}>Assistir último episódio</button>
        </div>
        <div className={styles.searchContainer}>
          <form style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Pesquisar episódio..."
              onChange={handleSearch}
              className={styles.searchInput}
            />
          </form>
        </div>

        <div className={styles.episodesContainer}>
          {filteredEpisodes.length > 0 ? (
            <ul className={styles.episodesList}>
              {filteredEpisodes.map((episode) => (
                <li key={episode.id} className={styles.episodeItem}>
                  <div className={styles.imageContainer}>
                    <img
                      src={episode.image}
                      alt={`Episódio ${episode.id}`}
                      className={styles.episodeImage}
                    />
                  </div>
                  <div className={styles.episodeDetails}>
                    <Link
                      className={styles.episodeTitle}
                      href={`/watch/${episode.id}/${episode.slug}`}
                    >
                      {episode.title}
                    </Link>
                    <span className={styles.releaseDate}>
                      {episode.releaseDate}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noEpisodes}>Nenhum episódio encontrado.</p>
          )}
        </div>
      </div>

      <div className={styles.rightColumn}>
        <h2>Veja também!</h2>
        <ul className={styles.recommendationsList}>
          {recommendations.length > 0 ? (
            recommendations.map((recommendation) => (
              <li key={recommendation.id} className={styles.recommendationItem}>
                <Link href={`/series/${recommendation.id}/${recommendation.slug}`}>
                  <div className={styles.recommendationContent}>
                    <img
                      src={recommendation.image}
                      alt={recommendation.name}
                      className={styles.recommendationImage}
                    />
                    <div className={styles.recommendationDetails}>
                      <h3 className={styles.recommendationName}>{recommendation.name}</h3>
                      <span className={styles.recommendationDate}>
                        {recommendation.releaseYear}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p className={styles.noRecommendations}>
              Nenhuma recomendação encontrada.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Page;
