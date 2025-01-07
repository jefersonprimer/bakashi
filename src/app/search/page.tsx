'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import animesData from '../../data/animes.json';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css'; // Adapte o caminho conforme necessário
import Head from 'next/head'; // Importando o Head para atualizar o título da página

// Defina o tipo para os animes
type Anime = {
  id: number;
  name: string;
  slug: string;
  data: string;
  image: string;
  synopsis: string;
  isLancamento: boolean;
  rating: string;
  score: number;
  genres: string[];
  airing: string;
  episodes: number;
  season: number;
};

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const searchParams = useSearchParams(); // Para acessar a query string
  const query = searchParams?.get('query'); // Pegando o valor da query "query" (ex: ?query=naruto)

  useEffect(() => {
    if (query) {
      setSearchTerm(query); // Atualiza o campo de busca com o termo da query
    }
  }, [query]);

  useEffect(() => {
    // Filtra os animes com base no termo de busca
    if (searchTerm) {
      const filtered = animesData.Animes.filter((anime) =>
        anime.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAnimes(filtered);
    } else {
      setFilteredAnimes([]);
    }
  }, [searchTerm]);

  return (
    <div className={styles.searchPage}>
      {/* Atualizando o título da página com o termo de pesquisa */}
      <Head>
        <title>{searchTerm ? `Você pesquisou por "${searchTerm}" - Bakashi TV` : 'Pesquisa de Animes - Bakashi TV'}</title>
      </Head>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.searchButton}>
          Buscar
        </button>

        {/* Exibe os resultados filtrados */}
        {filteredAnimes.length > 0 && (
          <ul className={styles.results}>
            {filteredAnimes.map((anime) => (
              <li key={anime.id} className={styles.resultItem}>
                <Link href={`/animes/${anime.slug}`}>
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
        )}

        {/* Caso não encontre resultados */}
        {filteredAnimes.length === 0 && searchTerm && (
          <p className={styles.noResults}>Nenhum anime encontrado para "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
}
