import React from "react";

import styles from "./Outdoor.module.css"

interface OutdoorProps {
  imageUrl: string;
  title: string;
  audiotype: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  addToQueueText?: string;
  addToQueueLink?: string;
}

const Outdoor: React.FC<OutdoorProps> = ({
  imageUrl,
  title,
  audiotype,
  description,
  buttonText = "Saiba mais",
  buttonLink = "#",
  addToQueueText = "Adicionar à Fila",
  addToQueueLink = "#",
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img className={styles.image}
          src={imageUrl}
          alt={title}
        />
      </div>

      <div className={styles.textContainer}>
        <h2 className={styles.title}>
          {title}
        </h2>
        <h2 className={styles.audioType}>
          {audiotype}
        </h2>
        <p className={styles.description}>
          {description}
        </p>
        <div className={styles.containerBtn}>
          {buttonText && buttonLink && (
            <a 
              href={buttonLink}
              className={styles.buttonLink}
            >
              {buttonText}
            </a>
          )}
          {addToQueueText && addToQueueLink && (
            <a
              href={addToQueueLink}
              className={styles.addToQueueLink}
            >
              {addToQueueText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Outdoor;
