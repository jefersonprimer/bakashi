import React from 'react';
import styles from './Footer.module.css'; // Importando o arquivo de estilos

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.links}>
          <ul>
            <li>
              <a href="/sobre">Sobre nós</a>
            </li>
            <li>
              <a href="/contato">Contato</a>
            </li>
            <li>
              <a href="/privacidade">Política de Privacidade</a>
            </li>
            <li>
              <a href="/termos">Termos de Serviço</a>
            </li>
          </ul>
        </div>

        <div className={styles.socialIcons}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram" />
          </a>
        </div>
      </div>

      <div className={styles.copyRight}>
        <p>© 2025 Bakashi TV. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
