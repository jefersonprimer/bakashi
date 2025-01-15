'use client';


import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';
import logo from '../../../../public/logo.png';
import animesData from '@/data/animes.json';
import { useRouter } from 'next/navigation';
import { Anime } from '@/types/anime'; 

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [isOpen, setIsOpen] = useState(false); // Controla se os resultados estão visíveis
  const [isDropdownNavOpen, setDropdownNavOpen] = useState(false); // Dropdown de navegação
  const [isDropdownNewsOpen, setDropdownNewsOpen] = useState(false); // Dropdown de notícias
  const resultsRef = useRef<HTMLUListElement | null>(null); // Referência para o container dos resultados de pesquisa
  const dropdownNavRef = useRef<HTMLDivElement | null>(null); // Referência para o container do menu dropdown de navegação
  const dropdownNewsRef = useRef<HTMLDivElement | null>(null); // Referência para o container do menu dropdown de notícias
  const router = useRouter(); // Usando o useRouter para navegação programática

   // Função que detecta clique fora do contêiner de resultados ou dropdown
   const handleClickOutside = (event: MouseEvent) => {
    if (
      (resultsRef.current && !resultsRef.current.contains(event.target as Node)) ||
      (dropdownNavRef.current && !dropdownNavRef.current.contains(event.target as Node)) ||
      (dropdownNewsRef.current && !dropdownNewsRef.current.contains(event.target as Node))
    ) {
      setIsOpen(false); // Fecha os resultados se clicar fora
      setDropdownNavOpen(false); // Fecha o dropdown de navegação
      setDropdownNewsOpen(false); // Fecha o dropdown de notícias
    }
  };

  // Adiciona e remove o ouvinte de clique fora do container
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Limpa o ouvinte ao desmontar
    };
  }, []);

  // Funções para alternar a visibilidade dos dropdowns
  const toggleDropdownNav = () => {
    setDropdownNavOpen((prevState) => !prevState);
  };

  const toggleDropdownNews = () => {
    setDropdownNewsOpen((prevState) => !prevState);
  };

  // Função para redirecionar para a página de pesquisa ao clicar no ícone de busca
  const handleSearchClick = () => {
    router.push('/search');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.headerLogo}>
          <Link href="/">
            <Image src={logo} alt="Logo do Site" width={180} height={40} priority />
          </Link>
        </div>

        <div className={styles.headerMenu}>
          {/* Links de Navegação */}
          {/* Links de Navegação */}
        <ul className={styles.navLinks}>
          {/* Navegação com Dropdown */}
          <li className={styles.navItem} onClick={toggleDropdownNav}>
            <Link href="#">
              <span className={styles.titleNavegation}>Navegar</span>
              <div className={`${styles.ercHeaderSvg} menu-icon`}>
                <svg
                  className={styles.headerSvgIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-t="dropdown-svg"
                  aria-labelledby="dropdown-svg"
                  aria-hidden="true"
                  role="img"
                >
                  <title id="dropdown-svg">Menu dropdown</title>
                  <path d="M7 10h10l-5 5z"></path>
                </svg>
              </div>
            </Link>
            {/* Dropdown de Navegação */}
            {isDropdownNavOpen && (
              <div ref={dropdownNavRef} className={styles.dropdownMenu}>
                <div className={styles.menuContent}>
                  {/* Coluna de Categorias (Popular, Novidades, A-Z) */}
                  <div className={styles.categoriesColumn}>
                    <Link href="/videos/popular">Populares</Link>
                    <Link href="/videos/new">Novidades</Link>
                    <Link href="/videos/alphabetical">A-Z</Link>
                    <Link href="/calendar">Calendário</Link>
                    <Link href="/history">Histórico</Link>
                    <Link href="/series">Animes</Link>
                    {/* <Link href="/watch">Episódios</Link> */}
                  </div>

                  {/* Divisória entre as colunas */}
                  <div className={styles.divider}></div>

                  {/* Coluna de Gêneros */}
                  <div className={styles.genresSection}>
                    <h3 className={styles.genresTitle}>GÊNEROS</h3>
                    <div className={styles.genresGrid}>
                      <div className={styles.genresColumn}>
                        <Link href="/videos/action">Ação</Link>
                        <Link href="/videos/adventure">Aventura</Link>
                        <Link href="/videos/comedy">Comédia</Link>
                        <Link href="/videos/drama">Drama</Link>
                        <Link href="/videos/fantasy">Fantasia</Link>
                      </div>
                      <div className={styles.genresColumn}>
                        <Link href="/videos/music">Música</Link>
                        <Link href="/videos/romance">Romance</Link>
                        <Link href="/videos/sci-fi">Ficção Científica</Link>
                        <Link href="/videos/seinen">Seinen</Link>
                        <Link href="/videos/shoujo">Shoujo</Link>
                      </div>
                      <div className={styles.genresColumn}>
                        <Link href="/videos/shounen">Shounen</Link>
                        <Link href="/videos/slice-of-life">Slice-of-Life</Link>
                        <Link href="/videos/sports">Esportes</Link>
                        <Link href="/videos/supernatural">Sobrenatural</Link>
                        <Link href="/videos/thriller">Suspense</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Dropdown de Notícias */}
          <li className={styles.navItem} onClick={toggleDropdownNews}>
            <Link href="#">
              <span className={styles.titleNews}>Notícias</span>
              <div className={`${styles.ercHeaderSvg} menu-icon`}>
                <svg
                  className={styles.headerSvgIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  data-t="dropdown-svg"
                  aria-labelledby="dropdown-svg"
                  aria-hidden="true"
                  role="img"
                >
                  <title id="dropdown-svg">Menu dropdown</title>
                  <path d="M7 10h10l-5 5z"></path>
                </svg>
              </div>

            </Link>
            {isDropdownNewsOpen && (
              <div ref={dropdownNewsRef} className={`${styles.dropdownMenu} ${styles.newsDropdown}`}>
                <div className={styles.menuContent}>
                  <div className={styles.categoriesColumn}>
                    <Link href="/news/popular">Todas as Notícias</Link>
                    <Link href="/news/new">Animes do Ano</Link>
                    <Link href="/news/alphabetical">Animes da Temporada</Link>
                  </div>
                </div>
              </div>
            )}
          </li>
        </ul>
        </div>

        {/* Ícones de Busca, Watchlist e Menu de Conta */}
        <div className={styles.headerActions}>
          <div className={styles.searchContainer}>
            <div className={styles.searchIcon}>
              <button onClick={handleSearchClick} className={styles.searchButton}>
                <div className={styles.ercHeaderSvg}>
                  <svg
                    className={styles.headerSvgIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    data-t="search-svg"
                    aria-labelledby="search-svg"
                    aria-hidden="false"
                    role="img"
                  >
                    <title id="search-svg">Buscar</title>
                    <path d="M15.474 14.035l6.235 6.26a1 1 0 1 1-1.418 1.41l-6.228-6.253a7.5 7.5 0 1 1 1.41-1.418zM9.5 15a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"></path>
                  </svg>
                </div>
              </button>
            </div>
            <div className={styles.ercHeaderSvg}>
              <svg
                className={styles.headerSvgIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-t="watchlist-svg"
                aria-labelledby="watchlist-svg"
                aria-hidden="false"
                role="img"
              >
                <title id="watchlist-svg">Fila</title>
                <path d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z"></path>
              </svg>
            </div>
            <div className={styles.ercHeaderSvg}>
              <svg
                className={styles.headerSvgIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-t="user-settings-svg"
                aria-labelledby="user-settings-svg"
                aria-hidden="true"
                role="img"
              >
                <title id="user-settings-svg">Menu da conta</title>
                <path d="M12 20a6.01 6.01 0 0 1-5.966-5.355L12 12.088l5.966 2.557A6.01 6.01 0 0 1 12 20m0-16c1.654 0 3 1.346 3 3s-1.345 3-2.999 3h-.002A3.003 3.003 0 0 1 9 7c0-1.654 1.346-3 3-3m7.394 9.081l-4.572-1.959A4.997 4.997 0 0 0 17 7c0-2.757-2.243-5-5-5S7 4.243 7 7c0 1.71.865 3.22 2.178 4.122l-4.572 1.959A.999.999 0 0 0 4 14c0 4.411 3.589 8 8 8s8-3.589 8-8c0-.4-.238-.762-.606-.919"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>

  );
}
