'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

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
          placeholder="Digite o nome de um anime..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Campo de busca"
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Buscar
        </button>

        {loading ? (
          <p className={styles.loading}>Carregando resultados...</p>
        ) : filteredAnimes.length > 0 ? (
          <ul className={styles.results}>
            {filteredAnimes.map((anime) => (
              <li key={anime.id} className={styles.resultItem}>
                <Link href={`/series/${anime.id}/${anime.slug}`} key={anime.id}>
                  <div className={styles.resultContent}>
                    <Image
                      src={anime.image}
                      alt={anime.name}
                      width={50}
                      height={75}
                      className={styles.resultImage}
                    />
                    <div className={styles.textContent}>
                      <span className={styles.resultName}>{anime.name}</span>
                      <span className={styles.resultScore}>{anime.score}</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noResults}>Nenhum anime encontrado para "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
}
