"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import AnimeGrid from '../../app/components/cards/AnimeGrid'; // Importando o AnimeGrid
import { Anime } from '@/types/anime';
import styles from './styles.module.css';

import useFetchAnimes from '../hooks/useFetchAnimes'; // Hook para buscar animes da API

export default function Search() {
  const { animes, loading, error } = useFetchAnimes(); // Usando o hook para buscar os animes da API
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams?.get('query');

  // Atualiza o estado searchTerm com o valor da query da URL
  useEffect(() => {
    if (query) {
      setSearchTerm(query);
    }
  }, [query]);

  // Filtra os animes sempre que searchTerm ou animes mudarem
  useEffect(() => {
    if (animes.length > 0 && searchTerm) {
      const filtered = animes.filter((anime) =>
        anime.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAnimes(filtered);
    } else {
      setFilteredAnimes([]); // Se o campo de busca estiver vazio, não mostra resultados
    }
  }, [searchTerm, animes]);

  // Atualiza a URL com o termo de pesquisa
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
        {/* Mostrar resultados apenas se houver pesquisa ou se não estiver carregando */}
        {searchTerm && loading ? (
          <p className={styles.loading}>Carregando resultados...</p>
        ) : searchTerm && !loading && filteredAnimes.length === 0 ? (
          <p className={styles.loading}>Nenhum anime encontrado.</p>
        ) : (
          searchTerm && <AnimeGrid animes={filteredAnimes} /> // Passando os animes filtrados para o AnimeGrid
        )}
      </div>
    </div>
  );
}
