'use client';

import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Colunas superiores */}
      <div className={styles.footerColumns}>
      {/* Seção de Navegação */}
        <div>
          <h4 className={styles.title}>Navegação</h4>
          <ul className="list">
            <li><a href="/series-populares">Séries Populares</a></li>
            <li><a href="/simulcasts">Séries em Simulcast</a></li>
            <li><a href="/calendario-lancamentos">Calendário de Lançamentos</a></li>
            <li><a href="/noticias">Notícias</a></li>
            <li><a href="/jogos">Jogos</a></li>
          </ul>
        </div>
        
        {/* Seção de Contato */}
        <div>
          <h4 className={styles.title}>Contate-nos</h4>
          <ul className="list">
            <li><a href="https://youtube.com" target="_blank">YouTube</a></li>
            <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
            <li><a href="https://tiktok.com" target="_blank">TikTok</a></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.title}>Crunchyroll</h4>
          <ul className="list">
            <li><a href="#">Comece um Teste Gratuito</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Centro de Ajuda</a></li>
            <li><a href="#">Termos de Uso</a></li>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Ferramenta de Consentimento de Cookies</a></li>
            <li><a href="#">Solicitações de Imprensa</a></li>
            <li><a href="#">Baixe o App</a></li>
            <li><a href="#">Resgatar Código</a></li>
            <li><a href="#">Vagas</a></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.title}>Conta</h4>
          <ul className="list">
            <li><a href="#">Trocar de Perfil</a></li>
            <li><a href="#">Fila</a></li>
            <li><a href="#">Crunchylistas</a></li>
            <li><a href="#">Histórico</a></li>
            <li><a href="#">Minha Conta</a></li>
            <li><a href="#">Sair</a></li>
          </ul>
        </div>
      </div>

      {/* Parte inferior */}
      <div className={styles.footerLegalWrapper}>
        <img
          className={styles.footerLogo}
          src="https://www.crunchyroll.com/build/assets/img/footer/sony_pictures_logo.png"
          alt="Sony Pictures Logo"
        />
        <div role="button" tabIndex="0" className={styles.dropdownTrigger}>
          <span>Português (Brasil)</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
