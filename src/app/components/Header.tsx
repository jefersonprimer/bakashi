'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTv, faCalendar, faClock, faHistory } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';
import logo from '../../../public/uploads/2024-12/logoo.png';
import animesData from '../../data/animes.json';

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

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [isOpen, setIsOpen] = useState(false); // Controla se os resultados estão visíveis

  // Alteração aqui: o tipo do useRef deve ser HTMLUListElement | null, já que é um <ul>
  const resultsRef = useRef<HTMLUListElement | null>(null); // Referência para o container dos resultados de pesquisa

  useEffect(() => {
    // Filtra os animes com base no termo de busca
    if (searchTerm) {
      const filtered = animesData.Animes.filter((anime) =>
        anime.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAnimes(filtered);
      setIsOpen(true); // Exibe os resultados quando há algo para filtrar
    } else {
      setFilteredAnimes([]);
      setIsOpen(false); // Oculta os resultados quando a busca é limpa
    }
  }, [searchTerm]);

  // Função que detecta clique fora do contêiner de resultados
  const handleClickOutside = (event: MouseEvent) => {
    // Verifica se o clique foi fora do contêiner de resultados
    if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
      setIsOpen(false); // Fecha os resultados se clicar fora
    }
  };

  // Adiciona e remove o ouvinte de clique fora do container
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Limpa o ouvinte ao desmontar
    };
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/">
            <Image src={logo} alt="Logo do Site" width={180} height={40} priority />
          </Link>
        </div>

        {/* Links de Navegação */}
        <ul className={styles.navLinks}>
          <li>
            <Link href="/animes">
              <FontAwesomeIcon icon={faTv} className={styles.icon} />
              Animes
            </Link>
          </li>
          <li>
            <Link href="/calendar">
              <FontAwesomeIcon icon={faCalendar} className={styles.icon} />
              Calendário
            </Link>
          </li>
          <li>
            <Link href="/episodios">
              <FontAwesomeIcon icon={faClock} className={styles.icon} />
              Episódios
            </Link>
          </li>
          <li>
            <Link href="/historico">
              <FontAwesomeIcon icon={faHistory} className={styles.icon} />
              Histórico
            </Link>
          </li>
        </ul>

        {/* Área de Busca */}
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchButton}>
            <FontAwesomeIcon icon={faSearch} />
          </button>

          {/* Exibe os resultados filtrados */}
          {isOpen && filteredAnimes.length > 0 && (
            <ul ref={resultsRef} className={styles.results}>
              {filteredAnimes.slice(0, 6).map((anime) => (
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
                        <span className={styles.resultScore}>{anime.score}</span> {/* Adicionando o score */}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
              {/* Exibe o link "View All Results" se houver mais de 6 itens */}
              {filteredAnimes.length > 6 && (
                <li className={styles.viewAll}>
                  <Link href={`/search?query=${searchTerm}`}>
                    View All Results
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
