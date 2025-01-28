import React from 'react';
import  useFetchEpisodes  from '../../hooks/useFetchEpisodes'; // Importando o hook de episódios
import  useFetchAnimes  from '../../hooks/useFetchAnimes'; // Importando o hook de animes
import styles from './ContinueAssistindo.module.css';

const ContinueAssistindo = () => {
  // Pega os episódios do hook
  const { episodes, loading: loadingEpisodes, error: errorEpisodes } = useFetchEpisodes();
  // Pega os animes do hook
  const { animes, loading: loadingAnimes, error: errorAnimes } = useFetchAnimes();

  // Se ainda estiver carregando ou se houve erro, exibe mensagem
  if (loadingEpisodes || loadingAnimes) {
    return <p>Carregando episódios...</p>;
  }

  if (errorEpisodes || errorAnimes) {
    return <p>{errorEpisodes || errorAnimes}</p>;
  }

  // Filtra os episódios assistidos
  const watchedEpisodes = episodes.filter((episode) => episode.watched); // Aqui assumimos que há um campo "watched" para indicar episódios assistidos

  // Se não houver episódios assistidos, exibe mensagem
  if (watchedEpisodes.length === 0) {
    return <p>Nenhum episódio assistido ainda.</p>;
  }

  return (
    <div className={styles.container}>
      <h2>Continue Assistindo</h2>
      <div className={styles.episodesContainer}>
        {watchedEpisodes.map((episode) => {
          // Pega os detalhes do anime usando o animeId
          const anime = animes.find((anime) => anime.id === episode.animeId);

          return (
            <div key={episode.id} className={styles.episodeCard}>
              <div className={styles.episodeImageContainer}>
                <a href={`/episodios/${episode.id}`} className={styles.episodeLink}>
                  <img
                    src={episode.image}
                    alt={`Episódio ${episode.title}`}
                    className={styles.episodeImage}
                  />
                </a>
              </div>
              <div className={styles.episodeDetails}>
                {/* Exibe o nome do anime e título do episódio */}
                <h3>{anime?.name}</h3>
                <p>{episode.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContinueAssistindo;
