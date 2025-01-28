'use client';

import React, { useState } from 'react';
import { FavoritesProvider } from '../contexts/FavoritesContext'; // Contexto de favoritos
import Fila from '../Fila/page'; // Componente da Fila
import CrunchyList from '../crunchylists/page'; // Componente da Crunchylist
import History from '../history/page'; // Componente do Histórico
import styles from './styles.module.css'; // Importando o arquivo de estilos

const WatchlistPage = () => {
  const [selectedTab, setSelectedTab] = useState('fila'); // Estado para controlar qual aba está selecionada

  const renderContent = () => {
    switch (selectedTab) {
      case 'fila':
        return <Fila />;
      case 'crunchylist':
        return <CrunchyList />;
      case 'historico':
        return <History />;
      default:
        return <Fila />; // Fallback para Fila caso o valor não seja reconhecido
    }
  };

  return (
    <FavoritesProvider>
      <div className={styles.appLayoutContent}>
        <div className={styles.pageWrapper}>
          <div className={styles.contentWrapper}>
            <div className={styles.myListsHeader}>
              <h1 className={styles.heading}><svg className={styles.iconBookMark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="watchlist-svg" aria-labelledby="watchlist-svg" aria-hidden="true" role="img"><title id="watchlist-svg">Fila</title><path d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z"></path></svg>
              <span className={styles.title}>Minhas Listas</span></h1>
              <div className={styles.tabs}>
                <div className={styles.tabsContentWrapper}>
                  <div role="tablist" className={styles.tabsScroller}>
                    <a
                      onClick={() => setSelectedTab('fila')}
                      className={`${styles.tabsItem} ${selectedTab === 'fila' ? styles.active : ''}`}
                      href="#"
                    >
                      <span className={styles.tabsItemText}>FILA</span>
                    </a>
                    <a
                      onClick={() => setSelectedTab('crunchylist')}
                      className={`${styles.tabsItem} ${selectedTab === 'crunchylist' ? styles.active : ''}`}
                      href="#"
                    >
                      <span className={styles.tabsItemText}>CRUNCHYLISTAS</span>
                    </a>
                    <a
                      onClick={() => setSelectedTab('historico')}
                      className={`${styles.tabsItem} ${selectedTab === 'historico' ? styles.active : ''}`}
                      href="/history"
                    >
                      <span className={styles.tabsItemText}>HISTÓRICO</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.watchlistBody}>
              <div className={styles.ercWatchlist}>
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FavoritesProvider>
  );
};

export default WatchlistPage;
