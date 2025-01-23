import React from "react";
import styles from "./OutdoorCard.module.css";

interface OutdoorCardProps {
  link: string; // URL para onde o card deve redirecionar
  imageUrl: string; // URL da imagem a ser exibida
  altText?: string; // Texto alternativo da imagem (opcional)
}

const OutdoorCard: React.FC<OutdoorCardProps> = ({ link, imageUrl, altText = "Outdoor do Anime" }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.outdoorCard}
    >
      <img src={imageUrl} alt={altText} className={styles.image} />
    </a>
  );
};

export default OutdoorCard;
