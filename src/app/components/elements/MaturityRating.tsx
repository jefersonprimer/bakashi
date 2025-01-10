import React from 'react';
import styles from './MaturityRating.module.css'; // Ajuste o caminho do CSS conforme necessário

interface MaturityRatingProps {
  rating: number;
}

const MaturityRating: React.FC<MaturityRatingProps> = ({ rating }) => {
  let maturityText = '';
  let backgroundColor = '';

  // Definindo o texto e a cor de fundo de acordo com a classificação
  switch (rating) {
    case 10:
      maturityText = 'A10';
      backgroundColor = '#00BFFF'; // Azul claro para A10
      break;
    case 12:
      maturityText = 'A12';
      backgroundColor = '#FFD700'; // Amarelo dourado para A12
      break;
    case 14:
      maturityText = 'A14';
      backgroundColor = '#FFA500'; // Laranja para A14
      break;
    case 16:
      maturityText = 'A16';
      backgroundColor = '#FF8C00'; // Laranja mais intenso para A16
      break;
    case 18:
      maturityText = 'A18';
      backgroundColor = '#FF0000'; // Vermelho para A18
      break;
    default:
      maturityText = 'Classificação Indisponível';
      backgroundColor = '#D3D3D3'; // Cinza para classificações desconhecidas
  }

  return (
    <span className={styles.maturityRating} style={{ backgroundColor }}>
      {maturityText}
    </span>
  );
};

export default MaturityRating;