'use client'

import React, { useState } from 'react';
import styles from './styles.module.css'; // Importando o CSS Module

const Fila = () => (
  <div className={styles.emptyListBox}>
    <div className={styles.wrapper}>
      <img
        src="https://www.crunchyroll.com/build/assets/img/empty_list_state/empty-watchlist.png"
        alt="Empty Watchlist"
        className={styles.image}
      />
    </div>
    <h4 className={styles.description}>
      Sua Fila merece mais amor. <br /> Vamos enchê-la com animes incríveis.
    </h4>
    <div className={styles.button}>
      <a href="/pt-br/" className={styles.returnButton}>
        Voltar para tela inicial
      </a>
    </div>
  </div>
);

const Crunchylistas = () => (
  <div>
    <h4>Crunchylistas</h4>
    <p>Adicione ou edite suas listas personalizadas de animes.</p>
  </div>
);

const Historico = () => (
  <div>
    <h4>Histórico</h4>
    <p>Aqui você pode ver todos os animes que assistiu recentemente.</p>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState<'fila' | 'crunchylist' | 'history'>('fila');

  return (
    <div className={styles.appLayout}>
      <div className={styles.pageWrapper}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Minhas Listas</h1>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabItem} ${activeTab === 'fila' ? styles.active : ''}`}
              onClick={() => setActiveTab('fila')}
            >
              Fila
            </button>
            <button
              className={`${styles.tabItem} ${activeTab === 'crunchylist' ? styles.active : ''}`}
              onClick={() => setActiveTab('crunchylist')}
            >
              Crunchylistas
            </button>
            <button
              className={`${styles.tabItem} ${activeTab === 'history' ? styles.active : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Histórico
            </button>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          {activeTab === 'fila' && <Fila />}
          {activeTab === 'crunchylist' && <Crunchylistas />}
          {activeTab === 'history' && <Historico />}
        </div>
      </div>
    </div>
  );
};

export default App;
