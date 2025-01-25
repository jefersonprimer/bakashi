// so vai aparecer se o usuario comecou a assistir a um ep

import Link from 'next/link';
import styles from './ContinueWatching.module.css';

const ContinueWatching = () => {
  return (
    <div data-id="01JHTDQF0SQHP83EAX046QKES4">
      <div>
        <div id="01JHTDQF0SQHP83EAX046QKES4">
          <div className={styles.container}>
            <div className={styles.feedHeader}>
              <h2 className={`${styles.heading} ${styles.headingBold}`}>
                Continue Assistindo
              </h2>
              <Link href="/pt-br/history" passHref>
                <a
                  tabIndex={0}
                  data-t="view-history-btn"
                  className={styles.viewLink}
                >
                  <span className={styles.viewLinkTextWrapper}>
                    <span className={styles.viewLinkText}>
                      Ver Histórico
                    </span>
                    <svg
                      className={`${styles.angleIcon} ${styles.angleRight}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      data-t="angle-right-svg"
                      aria-labelledby="angle-svg"
                      aria-hidden="true"
                      role="img"
                    >
                      <title id="angle-svg">Próximo</title>
                      <path d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4 4.6-4.6z"></path>
                    </svg>
                  </span>
                </a>
              </Link>
            </div>
            <div className={styles.historyCollection} data-t="history">
              <div className={styles.collectionItem}>
                <div className={styles.playableCard} data-t="episode-card">
                  <Link href="/pt-br/watch/G7PU3PWMJ/mecha-ude-user" passHref>
                    <a
                      tabIndex={-1}
                      className={styles.thumbnailWrapper}
                    >
                      <div className={styles.thumbnail}>
                        <div className={styles.thumbnailImageWrapper}>
                          <img
                            className={styles.thumbnailImage}
                            loading="lazy"
                            src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180,blur=30/catalog/crunchyroll/fd1ccb8587da12d41362a6c5a4dab5af.jpg"
                            alt="A usuária de Mecha-Ude"
                            data-t="card-image"
                          />
                        </div>
                      </div>
                      <div className={styles.thumbnailIcon}>
                        <svg
                          className={styles.playIcon}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          data-t="play-filled-svg"
                          aria-labelledby="play-filled-svg"
                          aria-hidden="true"
                          role="img"
                        >
                          <title id="play-filled-svg">Reproduzir</title>
                          <path d="m4 2 16 10L4 22z"></path>
                        </svg>
                      </div>
                      <div className={styles.progressBarWrapper}>
                        <div className={styles.progressBarProgress} style={{ width: '9.00141%' }}></div>
                      </div>
                      <div className={styles.duration}>21m restantes</div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueWatching;
