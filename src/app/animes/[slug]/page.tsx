'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Importando useParams
import animesData from '../../../data/animes.json';
import styles from './styles.module.css';
import Link from 'next/link';

// Importando as interfaces do arquivo 'src/types/anime.ts' e 'src/types/episode.ts'
import { Anime } from '@/types/anime';
import { Episode } from '@/types/episode';

const Page = () => {
  const { slug } = useParams(); // Usando useParams para pegar o slug da URL
  const [anime, setAnime] = useState<Anime | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendations, setRecommendations] = useState<Anime[]>([]);

  useEffect(() => {
    if (slug) {
      // Filtra o anime pelo 'slug' da URL
      const foundAnime = animesData.Animes.find((anime) => anime.slug === slug);
      if (foundAnime) {
        setAnime(foundAnime);

        // Carregar episódios relacionados ao anime encontrado
        const relatedEpisodes = animesData.Episodes.filter(
          (episode) => episode.animeId === foundAnime.id
        );
        setEpisodes(relatedEpisodes);

        // Filtrar recomendações com base nos gêneros
        const filteredRecommendations = animesData.Animes.filter(
          (recAnime) =>
            recAnime.id !== foundAnime.id && // Excluir o anime atual
            recAnime.genres.some((genre) => foundAnime.genres.includes(genre)) // Gêneros em comum
        );

        setRecommendations(filteredRecommendations.slice(0, 5)); // Limitar a 5 recomendações
      }
    }
  }, [slug]); // Dependência do 'slug', será reexecutado quando mudar

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredEpisodes = episodes.filter((episode) =>
    episode.title.toLowerCase().includes(searchQuery)
  );

  if (!anime) {
    return <p>Carregando anime...</p>;
  }

  return (
    <div className={styles.container}>
      {/* Coluna Esquerda: Conteúdo Principal */}
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
                {anime.genres.map((genre, index) => (
                  <span key={index} className={styles.genreItem}>{genre}</span>
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
                    {/* Link para a página do episódio */}
                    <Link className={styles.episodeTitle} href={`/episodios/${anime.slug}/${episode.id}`}>
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

      {/* Coluna Direita: Recomendações */}
      <div className={styles.rightColumn}>
        <h2>Veja também!</h2>
        <ul className={styles.recommendationsList}>
          {recommendations.length > 0 ? (
            recommendations.map((recommendation) => (
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
  );
};

export default Page;
