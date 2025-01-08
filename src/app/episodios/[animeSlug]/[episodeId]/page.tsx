'use client';

import { FC } from 'react';
import { useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import data from '../../../../data/animes.json'; // Caminho para o arquivo JSON
import VideoPlayer from '../../../components/VideoPlayer';

import styles from './styles.module.css'; // Importando o CSS Module

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
  audioType?: string;
  status?: string;
}

interface Episode {
  id: number;
  title: string;
  videoUrl: string;
  image: string;
  animeId: number;
}

const EpisodePage: FC = () => {
  const { animeSlug, episodeId } = useParams();

  if (!animeSlug || !episodeId) return <div>Carregando...</div>;

  const anime = data.Animes.find((anime) => anime.slug === animeSlug);
  if (!anime) return <div>Anime não encontrado.</div>;

  const episode = data.Episodes.find(
    (ep: Episode) => ep.animeId === anime.id && ep.id === Number(episodeId)
  );
  if (!episode) return <div>Episódio não encontrado.</div>;

  const episodeIndex = data.Episodes.findIndex(
    (ep: Episode) => ep.id === episode.id
  );

  // Lógica para o próximo e anterior
  const prevEpisodeUrl =
    episodeIndex > 0
      ? `/episodios/${animeSlug}/${data.Episodes[episodeIndex - 1].id}`
      : null;
  const nextEpisodeUrl =
    episodeIndex < data.Episodes.length - 1
      ? `/episodios/${animeSlug}/${data.Episodes[episodeIndex + 1].id}`
      : null;

  const suggestedAnimes = data.Animes.filter(
    (suggestedAnime: Anime) =>
      suggestedAnime.genres.some((genre) => anime.genres.includes(genre)) &&
      suggestedAnime.slug !== animeSlug
  ).slice(0, 5);

  return (
    <div className={styles.episodePage}>
      <div className={styles.content}>
        <div className={styles.videoPlayerSection}>
          <div className={styles.episodeNavigation}>
            <a
              href={prevEpisodeUrl || '#'}
              className={`${styles.prevEpisode} ${!prevEpisodeUrl ? styles.disabled : ''}`}
            >
              <FontAwesomeIcon icon={faChevronLeft} /> Anterior
            </a>
            <a href={`/animes/${animeSlug}`} className={styles.detailsButton}>
              <FontAwesomeIcon icon={faTh} size="lg" />
            </a>
            <a
              href={nextEpisodeUrl || '#'}
              className={`${styles.nextEpisode} ${!nextEpisodeUrl ? styles.disabled : ''}`}
            >
              Próximo <FontAwesomeIcon icon={faChevronRight} />
            </a>
          </div>

          <VideoPlayer
            videoUrl={episode.videoUrl}
            posterImage={episode.image}
          />

          <div className={styles.infoBox}>
            <h1>
              {anime.name} - Episódio {episode.id} - Animes Online
            </h1>
            <h3>
              <strong>
                Assista {anime.name} - Episódio {episode.id} legendado em
                português.
              </strong>
            </h3>
            <div className={styles.genres}>
              {anime.genres.map((genre) => (
                <a key={genre} href={`/g/${genre.toLowerCase()}`} rel="tag">
                  {genre}
                </a>
              ))}
            </div>
            <div className={styles.poster}>
              <img src={anime.image} alt={anime.name} />
              <div className={styles.synopsis}>
                <strong>Sinopse:</strong>
                <p>{anime.synopsis}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Recomendações */}
        <div className={styles.rightColumn}>
          <h2>Veja também!</h2>
          <ul className={styles.recommendationsList}>
            {suggestedAnimes.length > 0 ? (
              suggestedAnimes.map((recommendation: Anime) => (
                <li key={recommendation.id} className={styles.recommendationItem}>
                  <img
                    src={recommendation.image}
                    alt={recommendation.name}
                    className={styles.recommendationImage}
                  />
                  <div className={styles.recommendationDetails}>
                    <h3 className={styles.recommendationName}>
                      {recommendation.name}
                    </h3>
                    <span className={styles.recommendationDate}>
                      {recommendation.data}
                    </span>
                  </div>
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
    </div>
  );
};

export default EpisodePage;
