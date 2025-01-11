'use client';

import { FC } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import animesData from "../../../../data/animes.json"; // Caminho para o arquivo JSON de animes
import episodesData from "../../../../data/episodes.json"; // Caminho para o arquivo JSON de episódios
import VideoPlayer from "../../../components/video/VideoPlayer";

import styles from "./styles.module.css";

import { Anime } from "@/types/anime";
import { Episode } from "@/types/episode";

const EpisodePage: FC = () => {
  const { id, slug } = useParams(); // Obtendo os parâmetros da URL

  if (!id || !slug) return <div>Carregando...</div>;

  // Encontrar o episódio pelo ID
  const episode = episodesData.episodes.find((ep: Episode) => ep.id === id);
  if (!episode) return <div>Episódio não encontrado.</div>;

  // Encontrar o anime correspondente usando o animeId do episódio
  const anime = animesData.animes.find((anime) => anime.id === episode.animeId);
  if (!anime) return <div>Anime não encontrado.</div>;

  // Encontrar o índice do episódio para navegação
  const episodeIndex = episodesData.episodes.findIndex((ep: Episode) => ep.id === episode.id);

  // Episódios anterior e próximo do mesmo anime
  const prevEpisode =
    episodeIndex > 0 && episodesData.episodes[episodeIndex - 1].animeId === episode.animeId
      ? episodesData.episodes[episodeIndex - 1]
      : null;

  const nextEpisode =
    episodeIndex < episodesData.episodes.length - 1 &&
    episodesData.episodes[episodeIndex + 1].animeId === episode.animeId
      ? episodesData.episodes[episodeIndex + 1]
      : null;

  const suggestedAnimes = animesData.animes.filter(
    (suggestedAnime: Anime) =>
      suggestedAnime.genres.some((genre) => anime.genres.includes(genre)) &&
      suggestedAnime.slug !== anime.slug
  ).slice(0, 5);

  return (
    <div className={styles.episodePage}>
      <div className={styles.content}>
        {/* Seção do Player de Vídeo */}
        <div className={styles.videoPlayerSection}>
          <div className={styles.episodeNavigation}>
            <Link
              href={prevEpisode ? `/watch/${prevEpisode.id}/${prevEpisode.slug}` : "#"}
              className={`${styles.prevEpisode} ${!prevEpisode ? styles.disabled : ""}`}
            >
              <FontAwesomeIcon icon={faChevronLeft} /> Anterior
            </Link>
            <Link href={`/series/${anime.id}/${anime.slug}`} className={styles.detailsButton}>
              <FontAwesomeIcon icon={faTh} size="lg" />
            </Link>
            <Link
              href={nextEpisode ? `/watch/${nextEpisode.id}/${nextEpisode.slug}` : "#"}
              className={`${styles.nextEpisode} ${!nextEpisode ? styles.disabled : ""}`}
            >
              Próximo <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </div>

          <VideoPlayer videoUrl={episode.videoUrl} posterImage={episode.image} />

          <div className={styles.infoBox}>
            <h1>
              {anime.name} - {episode.title} - Animes Online
            </h1>
            <h3>
              <strong>
                Assista {anime.name} - {episode.title} legendado em português.
              </strong>
            </h3>
            <div className={styles.genres}>
              {anime.genres.map((genre) => (
                <Link key={genre} href={`/g/${genre.toLowerCase()}`} rel="tag">
                  {genre}
                </Link>
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
                      {recommendation.releaseYear}
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <p className={styles.noRecommendations}>Nenhuma recomendação encontrada.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EpisodePage;
