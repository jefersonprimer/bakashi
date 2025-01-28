import { useState, useEffect } from 'react';
import useFetchEpisodes from '../../hooks/useFetchEpisodes';
import useFetchAnimes from '../../hooks/useFetchAnimes';
import styles from './Episodios.module.css';

const EpisodesPage = () => {
  const { episodes, loading: loadingEpisodes, error: errorEpisodes } = useFetchEpisodes();
  const { animes, loading: loadingAnimes, error: errorAnimes } = useFetchAnimes();

  const getAnimeDetails = (animeId) => {
    return animes.find((anime) => anime.id === animeId);
  };

  // Função para formatar data
  const formatDate = (date) => {
    const options = { weekday: 'long' }; // Exibe apenas o dia da semana
    return new Date(date).toLocaleDateString('pt-BR', options);
  };

  // Função para agrupar os episódios
  const groupEpisodesByDate = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);

    const episodesGrouped = {
      hoje: [],
      ontem: [],
      anteontem: [],
    };

    episodes.forEach((episode) => {
      const releaseDate = new Date(episode.releaseDate);
      const releaseDay = releaseDate.toLocaleDateString('pt-BR');
      const todayDay = today.toLocaleDateString('pt-BR');
      const yesterdayDay = yesterday.toLocaleDateString('pt-BR');
      const twoDaysAgoDay = twoDaysAgo.toLocaleDateString('pt-BR');

      if (releaseDay === todayDay) {
        episodesGrouped.hoje.push(episode);
      } else if (releaseDay === yesterdayDay) {
        episodesGrouped.ontem.push(episode);
      } else if (releaseDay === twoDaysAgoDay) {
        episodesGrouped.anteontem.push(episode);
      }
    });

    return episodesGrouped;
  };

  const episodesGrouped = groupEpisodesByDate();

  if (loadingEpisodes || loadingAnimes) {
    return <div>Carregando dados...</div>;
  }

  if (errorEpisodes || errorAnimes) {
    return <div>{errorEpisodes || errorAnimes}</div>;
  }

  return (
    <div>
      {/* Header da página de episódios */}
      <header className={styles.header}>
        <h2>Novos Lançamentos</h2>
        <span>
          <a href="/calendar" className={styles.seeAll}>
            VER CALENDÁRIO DE LANÇAMENTOS
          </a>
        </span>
      </header>

      {/* Seção de Episódios - Hoje */}
      {episodesGrouped.hoje.length > 0 ? (
        <div>
          <h3>Hoje</h3>
          <div className={styles.episodesContainer}>
            {episodesGrouped.hoje.map((episode) => {
              const anime = getAnimeDetails(episode.animeId);
              return (
                <div key={episode.id} className={styles.episodeCard}>
                  <div className={styles.episodeImageContainer}>
                    <a href={`/episodios/${episode.id}`} className={styles.episodeLink}>
                      <img src={episode.image} alt={`Episódio ${episode.title}`} className={styles.episodeImage} />
                    </a>
                  </div>
                  <div className={styles.episodeDetails}>
                    <div className={styles.animeInfo}>
                      <h3>{anime?.name}</h3>
                    </div>
                    <div className={styles.episodeInfo}>
                      <p><strong>{episode.title}</strong></p>
                      <p><strong>Áudio:</strong> {anime?.audioType}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div><h3>Hoje</h3><p>Nenhum episódio disponível.</p></div>
      )}

      {/* Seção de Episódios - Ontem */}
      {episodesGrouped.ontem.length > 0 ? (
        <div>
          <h3>Ontem</h3>
          <div className={styles.episodesContainer}>
            {episodesGrouped.ontem.map((episode) => {
              const anime = getAnimeDetails(episode.animeId);
              return (
                <div key={episode.id} className={styles.episodeCard}>
                  <div className={styles.episodeImageContainer}>
                    <a href={`/episodios/${episode.id}`} className={styles.episodeLink}>
                      <img src={episode.image} alt={`Episódio ${episode.title}`} className={styles.episodeImage} />
                    </a>
                  </div>
                  <div className={styles.episodeDetails}>
                    <div className={styles.animeInfo}>
                      <h3>{anime?.name}</h3>
                    </div>
                    <div className={styles.episodeInfo}>
                      <p><strong>{episode.title}</strong></p>
                      <p><strong>Áudio:</strong> {anime?.audioType}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div><h3>Ontem</h3><p>Nenhum episódio disponível.</p></div>
      )}

      {/* Seção de Episódios - Anteontem */}
      {episodesGrouped.anteontem.length > 0 ? (
        <div>
          <h3>Anteontem</h3>
          <div className={styles.episodesContainer}>
            {episodesGrouped.anteontem.map((episode) => {
              const anime = getAnimeDetails(episode.animeId);
              return (
                <div key={episode.id} className={styles.episodeCard}>
                  <div className={styles.episodeImageContainer}>
                    <a href={`/episodios/${episode.id}`} className={styles.episodeLink}>
                      <img src={episode.image} alt={`Episódio ${episode.title}`} className={styles.episodeImage} />
                    </a>
                  </div>
                  <div className={styles.episodeDetails}>
                    <div className={styles.animeInfo}>
                      <h3>{anime?.name}</h3>
                    </div>
                    <div className={styles.episodeInfo}>
                      <p><strong>{episode.title}</strong></p>
                      <p><strong>Áudio:</strong> {anime?.audioType}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div><h3>Anteontem</h3><p>Nenhum episódio disponível.</p></div>
      )}

      {/* Botão para carregar mais episódios */}
      <div className={styles.loadMore}>
        <button>Ver mais</button>
      </div>
    </div>
  );
};

export default EpisodesPage;
