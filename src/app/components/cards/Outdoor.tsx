import React from "react";

import styles from "./Outdoor.module.css";

interface OutdoorProps {
  imageUrl: string;
  title: string;
  audiotype: string;
  description: string;
  buttonLink?: string;
  addToQueueText?: string;
  addToQueueLink?: string;
}

const Outdoor: React.FC<OutdoorProps> = ({
  imageUrl,
  title,
  audiotype,
  description,
  buttonLink = "#",
  addToQueueText = "#",
  addToQueueLink = "#",
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={imageUrl} alt={title} />
      </div>

      <div className={styles.textContainer}>
        <h2 className={styles.title}>{title}</h2>
        <h2 className={styles.audioType}>{audiotype}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.containerBtn}>
          {buttonLink && (
            <a href={buttonLink} className={styles.buttonLink}>
            <span className={styles.buttonContent}>
              <svg
                className={styles.iconPlay}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-labelledby="play-svg"
                aria-hidden="false"
                role="img"
              >
                <title id="play-svg">Play</title>
                <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006" />
              </svg>
              <span className={styles.titleName}>COMEÇAR A ASSISTIR E1</span>
            </span>
          </a>
          
          )}
          {addToQueueText && addToQueueLink && (
            <a href={addToQueueLink} className={styles.addToQueueLink}>
              <div className={styles.buttonBookmark}>
                <div className={styles.tooltip}>
                  <span className={styles.tooltipText}>Add to Watchlist</span>
                  <div className={styles.queueContent}>
                    <svg
                      className={styles.iconBookmark}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-labelledby="watchlist-svg"
                      role="img"
                    >
                      <title id="watchlist-svg">Watchlist</title>
                      <path d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z" />
                    </svg>
                    <span className={styles.queueText}>ADICIONAR À LISTA</span>
                  </div>
                </div>
              </div>
            </a>
          )}

        </div>
      </div>
    </div>
  );
};

export default Outdoor;
