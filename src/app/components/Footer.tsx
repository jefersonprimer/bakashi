'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import styles from './Footer.module.css'; // Importando o arquivo de estilos

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Scroll suave
    });
  };

  return (
    <div>
      <footer className={styles.footer}>
        <div className={styles.copyRight}>
          <p>Copyright © 2024 - Este site não hospeda nenhum arquivo de vídeo, apenas os cataloga.</p>
        </div>
        {/* Botão de Voltar ao Topo com Ícone */}
        <button className={styles.scrollToTopButton} onClick={scrollToTop}>
          <FontAwesomeIcon icon={faAngleUp} />
        </button>
      </footer>
    </div>
  );
};

export default Footer;
