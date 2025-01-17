import { useState } from 'react';
import useFetchEpisodes from '../../hooks/useFetchEpisodes'; // Caminho correto do hook
import styles from './Episodios.module.css';

const EpisodesPage = () => {
  const { episodes, loading, error } = useFetchEpisodes();
  const [currentPage, setCurrentPage] = useState(1);
  const episodesPerPage = 20;
  const totalPages = Math.ceil(episodes.length / episodesPerPage);

  // Paginação
  const currentEpisodes = episodes.slice(
    (currentPage - 1) * episodesPerPage,
    currentPage * episodesPerPage
  );

  if (loading) {
    return <div>Carregando episódios...</div>; // Exibe enquanto carrega
  }

  if (error) {
    return <div>{error}</div>; // Exibe o erro se houver
  }

  return (
    <div>
      {/* Header da página de episódios */}
      <header className={styles.header}>
        <h2>Episódios</h2>
        <span>
          {episodes.length}{' '}
          <a href="/episodios" className={styles.seeAll}>
            Ver todos
          </a>
        </span>
      </header>

      {/* Contêiner de Episódios */}
      <div className={styles.episodesContainer}>
        <div className={styles.grid}>
          {currentEpisodes.length === 0 ? (
            <div>Não há episódios para exibir.</div>
          ) : (
            currentEpisodes.map((episode) => (
              <div key={episode.id} className={styles.episodeCard}>
                <div className={styles.episodeImageContainer}>
                  {/* Link para a página específica do episódio */}
                  <a
                    href={`/episodios/${episode.id}`}
                    className={styles.episodeLink}
                  >
                    <img
                      src={episode.image}
                      alt={`Episódio ${episode.title}`}
                      className={styles.episodeImage}
                    />
                    {episode.isLancamento && (
                      <div className={styles.lancamentoLabel}>LANÇAMENTO</div>
                    )}
                  </a>
                </div>
                <p>{episode.title}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Paginação */}
      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? styles.active : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default EpisodesPage;
