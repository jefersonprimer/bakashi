'use client';

import styles from './Header.module.css';
import logo from '../../../../public/Crunchyroll-Logo.png';
import cat from '../../../../public/3357695.webp';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Anime } from '@/types/anime'; 

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownNavOpen, setDropdownNavOpen] = useState(false);
  const [isDropdownNewsOpen, setDropdownNewsOpen] = useState(false); 
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const resultsRef = useRef<HTMLUListElement | null>(null); 
  const dropdownNavRef = useRef<HTMLDivElement | null>(null); 
  const dropdownNewsRef = useRef<HTMLDivElement | null>(null); 
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleHamburgerMenu = () => {
    setIsHamburgerOpen((prevState) => !prevState);
  };

   // Função que detecta clique fora do contêiner de resultados ou dropdown
   const handleClickOutside = (event: MouseEvent) => {
    if (
      (resultsRef.current && !resultsRef.current.contains(event.target as Node)) ||
      (dropdownNavRef.current && !dropdownNavRef.current.contains(event.target as Node)) ||
      (dropdownNewsRef.current && !dropdownNewsRef.current.contains(event.target as Node))
    ) {
      setIsOpen(false);
      setDropdownNavOpen(false); 
      setDropdownNewsOpen(false);
    }
  };

  // Adiciona e remove o ouvinte de clique fora do container
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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

  // Função para redirecionar para a página de watchlist ao clicar no ícone de fila
  const handleWatchlistClick = () => {
    router.push('/watchlist');
  };

  // Função para redirecionar para a página de user ao clicar no ícone de fila
  const handleUserClick = () => {
    router.push('/user');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div
          className={styles.headerLogo}
          style={{ display: isMobileView ? 'none' : 'block' }}
        >
          <Link href="/">
            <div className={styles.logoContainer}>
              <Image className={styles.logo} src={logo} alt="Logo da Crunchyroll" width={1200} height={720} priority />
            </div>
          </Link>
        </div>

        <div className={styles.headerMenu}>
          {/* Links de Navegação */}
          {isMobileView ? (
            <div className={styles.hamburgerMenu}>
              {/* */}
              <div className={styles.hamburgerHeader}>
                <button
                  onClick={toggleHamburgerMenu}
                  className={styles.hamburgerIcon}
                  aria-expanded={isHamburgerOpen}
                >
                  <svg
                    className="headerSvgIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-labelledby="menu-svg"
                    aria-hidden="true"
                    role="img"
                  >
                    <title id="menu-svg">Menu</title>
                    <path d="M21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm0 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm0 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18z"></path>
                  </svg>
                </button>
                {/*logo mobile*/}
                <div className={styles.headerLogoMobile}>
                  <Link href="/">
                  <div className={styles.logoMobileContainer}>
                    <Image src={cat} alt="Logo do Site" width={26} height={26} priority />
                  </div>
                  </Link>
                </div>
              </div>
              {isHamburgerOpen && (
                <div className={styles.hamburgerLinks}>
                  <Link href="/videos/popular">Populares</Link>
                </div>
              )}
            </div>
          ) : (
        <ul className={styles.navLinks}>
          {/* Navegação com Dropdown */}
          <li
            className={`${styles.navItem} ${isDropdownNavOpen ? styles.activeNews : ''}`}
            onClick={toggleDropdownNav}
          >
            <Link href="#" className={styles.cNavegation}>
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
                  {/* A-Z */}
                  <div className={styles.categoriesColumn}>
                    <Link href="/videos/popular">Populares</Link>
                    <Link href="/videos/new">Novidades</Link>
                    <Link href="/videos/alphabetical">A-Z</Link>
                    <Link href="/calendar">Simulcasts da Temporada</Link>
                    <Link href="/history">Calendário de Lançamentos</Link>
                    <Link href="/series">Videoclips & Shows</Link>
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


            {/* Dropdown de jogos */}
          <li id='games' className={styles.navItem}>
            <Link href="/games/index.html">
              <span className={styles.titleNews}>Jogos</span>
              <div className={`${styles.ercHeaderSvg} menu-icon`}> 
              </div>
            </Link>
          </li>

          {/* Dropdown de Notícias */}
          <li
            className={`${styles.navItem} ${isDropdownNewsOpen ? styles.activeNews : ''}`}
            onClick={toggleDropdownNews}
          >
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

            {/* Dropdown de Notícias */}
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

        </ul>)}
        </div>

        {/* Ícones de Busca, Watchlist e Menu de Conta */}
        <div className={styles.headerActions}>
          <div className={styles.searchContainer}>

          <div className={styles.searchIcon}>
            <button onClick={handleSearchClick} className={styles.searchButton}>
              <div className={styles.iconBackground}> {/* Adicionando div com a classe de background */}
                <div className={styles.ercHeaderSvg}>
                  <svg className={styles.headerPrimiumIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-t="premium-filled-svg" aria-labelledby="premium-filled-svg" aria-hidden="true" role="img"><title id="premium-filled-svg">Premium</title><path d="M2.419 13L0 4.797 4.837 6.94 8 2l3.163 4.94L16 4.798 13.581 13z"></path></svg>
                  <div className={styles.textContainer}> {/* Nova div para os textos */}
                    <span className={styles.freeTrialText}>TESTE GRÁTIS</span>
                    <span className={styles.premiumText}>PREMIUM</span>
                  </div>
                  {/* Exibe o popup quando passar o mouse */}
                  <div className={styles.ercUpsellPopup}>
                    <a
                      tabIndex="0"
                      href="https://www.crunchyroll.com/pt-br/premium?referrer=newweb_header_modal&amp;return_url=https%3A%2F%2Fwww.crunchyroll.com%2Fpt-br%2Fcrunchylists#plans"
                      className={styles.contentWrapper}
                    >
                      <div className={styles.ercUpsellPopupBackground}>
                        <div className={styles.backgroundInner}>
                          {/* SVGs inseridos como background */}
                          <svg className={styles.leftUpStars} viewBox="0 0 50 36" xmlns="http://www.w3.org/2000/svg">
                            <g transform="translate(2 -7)" fill="none" fillRule="evenodd">
                              <path stroke="#FAB818" strokeWidth="2" d="m15.225 33.094.214 1.078-.744.833 1.083-.215.853.733-.237-1.068.73-.855-1.068.24z" />
                              <path stroke="#FFF" strokeWidth="2" d="m6.602 16.97.24 1.124-.837.868 1.218-.224.96.764-.267-1.113.822-.891-1.202.25z" />
                              <path stroke="#FAB818" strokeWidth="2.4" d="m36.534 15.907.088 1.565-1.215 1.028 1.57-.09 1.059 1.205-.123-1.554 1.201-1.063-1.555.127z" />
                            </g>
                          </svg>

                          <svg className={styles.rightUpStar} viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
                            <g transform="translate(-276 -10)" stroke="#FAB818" strokeWidth="2" fill="none" fillRule="evenodd">
                              <path d="m284.748 17.598.078.375-.273.28.396-.062.313.265-.087-.373.268-.287-.391.07z" />
                            </g>
                          </svg>

                          <svg className={styles.rightBottomLinesStar} viewBox="0 0 75 79" xmlns="http://www.w3.org/2000/svg">
                            <g transform="translate(-290 -89)" fill="none" fillRule="evenodd">
                              <path stroke="#FFC94D" strokeWidth="1.68" opacity=".688" d="m343.9 145.118.037.41-.31.28.412-.038.289.306-.047-.406.305-.29-.406.048z" />
                              <path stroke="#FAB818" opacity=".4" d="m365.957 85.043-52.5 82.059M361.457 173.102l-66-41.03" />
                            </g>
                          </svg>

                          <svg className={styles.leftBottomLines} viewBox="0 0 70 63" xmlns="http://www.w3.org/2000/svg">
                            <g transform="translate(5 -105)" stroke="#FAB818" fill="none" fillRule="evenodd" opacity=".4">
                              <path d="M-43 73 93.876 192.954M-35.5 158.5l93.301-21.628" />
                            </g>
                          </svg>
                        </div>
                      </div>

                      <div className={styles.content}>
                        <div className={styles.headerPremium}>
                          <span>
                          <svg className={styles.headerPremiumIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="premium-svg" aria-labelledby="premium-svg" aria-hidden="true" role="img"><title id="premium-svg">Apenas para Premium</title><path d="M18.188 17l1.667-5.606-4.26 1.864L12 7.688l-3.596 5.57-4.259-1.864L5.812 17h12.376zm-14.08 1.285L1.614 9.9a1 1 0 0 1 1.36-1.2l4.673 2.045 3.512-5.442a1 1 0 0 1 1.68 0l3.514 5.442 4.674-2.046a1 1 0 0 1 1.36 1.201l-2.494 8.386a1 1 0 0 1-.959.715H5.067a1 1 0 0 1-.959-.715z"></path></svg>
                          </span>
                          <h3 className={styles.heading}>Teste Gratuito de 7 Dias</h3>
                        </div>
                        <p className={styles.text}>
                          O Premium inclui acesso ilimitado a todos os animes, sem anúncios, com novos lançamentos logo após a exibição no Japão. Teste hoje mesmo!
                        </p>
                      </div>
                    </a>
                  </div>

                </div>
              </div>
            </button>
          </div>



            <div className={styles.searchIcon}>
              <button onClick={handleSearchClick} className={styles.searchButton}>
                <div className={styles.iconBackground}> {/* Adicionando div com a classe de background */}
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
                </div>
              </button>
            </div>

            <Link href="/watchlist">
              <div className={styles.iconBackground}> {/* Adicionando div com a classe de background */}
                <div className={styles.ercHeaderSvg} onClick={handleWatchlistClick}>
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
              </div>
            </Link>

            <div className={styles.iconBackground}> {/* Adicionando div com a classe de background */}
              <div className={styles.ercHeaderSvg} onClick={handleUserClick}>
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

      </div>
    </header>
  );
}