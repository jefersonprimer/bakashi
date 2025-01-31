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
    <div className={styles.container}>
      {/* Header da página de episódios */}
      <header className={styles.header}>
        <div className={styles.seeRealese}>
          <span><svg className={styles.angle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="curated-carousel-svg" aria-labelledby="curated-carousel-svg" aria-hidden="true" role="img"><title id="curated-carousel-svg">Carrossel Curado</title><path d="M22 1.2v17h-5.5L12 22.8l-4.5-4.6H2v-17h20zm-2 1.9H4v13h4.4l3.6 3.8 3.6-3.7H20V3.1zM9.5 5c.3-.1.7-.1 1 .1L16 8.9c.3.1.5.5.5.8 0 .3-.1.6-.4.8l-5.5 3.8c-.2.1-.4.2-.6.2-.2 0-.4 0-.5-.1-.3-.2-.5-.5-.5-.9V5.9c0-.4.2-.7.5-.9zM11 7.8v3.8l2.7-1.9L11 7.8z"></path></svg></span>
          <h2 className={styles.titleRealese}> Novos Lançamentos</h2>
        </div>
        <span>
          <a href="/calendar" className={styles.seeAll}>
            <div className={styles.seeRealese}>
              VER CALENDÁRIO DE LANÇAMENTOS
              <span><svg className={styles.angle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="angle-right-svg" aria-labelledby="angle-svg" aria-hidden="true" role="img"><title id="angle-svg">Próximo</title><path d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6z"></path></svg></span>
            </div>
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
        <button><span className={styles.titleSeeMore}>VER MAIS</span></button>
      </div>
    </div>
  );
};

export default EpisodesPage;
