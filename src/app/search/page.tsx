'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import AnimeGrid from '../../app/components/cards/AnimeGrid'; // Importando o AnimeGrid
import animesData from '@/data/animes.json';
import { Anime } from '@/types/anime';
import styles from './styles.module.css';


export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const query = searchParams?.get('query');

  useEffect(() => {
    if (query) {
      setSearchTerm(query);
    }
  }, [query]);

  useEffect(() => {
    setLoading(true);
    if (searchTerm) {
      const filtered = animesData.animes.filter((anime) =>
        anime.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAnimes(filtered);
    } else {
      setFilteredAnimes([]);
    }
    setLoading(false);
  }, [searchTerm]);

  const handleSearch = () => {
    const params = new URLSearchParams(window.location.search);
    params.set('query', searchTerm);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.searchPage}>
      <Head>
        <title>{searchTerm ? `Você pesquisou por "${searchTerm}" - Bakashi TV` : 'Pesquisa de Animes - Bakashi TV'}</title>
        <meta
          name="description"
          content={
            searchTerm
              ? `Resultados de busca para "${searchTerm}" em Bakashi TV. Explore animes populares e descubra novas séries!`
              : 'Pesquise seus animes favoritos em Bakashi TV, o melhor portal para fãs de animes!'
          }
        />
      </Head>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Campo de busca"
        />
      </div>

      <div className={styles.resultsContainer}>
        {loading ? (
          <p className={styles.loading}>Carregando resultados...</p>
        ) : (
          // Passando os animes filtrados para o AnimeGrid
          <AnimeGrid animes={filteredAnimes} />
        )}
      </div>
    </div>
  );
}
