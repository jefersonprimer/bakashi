'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import logo from '../../../../public/logo.png';
import { useRouter } from 'next/navigation';
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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdownNav = () => {
    setDropdownNavOpen((prevState) => !prevState);
  };

  const toggleDropdownNews = () => {
    setDropdownNewsOpen((prevState) => !prevState);
  };

  const handleSearchClick = () => {
    router.push('/search');
  };

  const handleWatchlistClick = () => {
    router.push('/watchlist');
  };

  const handleUserClick = () => {
    router.push('/user');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerLogo}>
          <Link href="/">
            <Image src={logo} alt="Logo do Site" width={180} height={40} priority />
          </Link>
        </div>

        <div className={styles.headerMenu}>
          {isMobileView ? (
            <div className={styles.hamburgerMenu}>
              <button onClick={toggleHamburgerMenu} className={styles.hamburgerIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-labelledby="hamburger-icon"
                  role="img"
                  aria-hidden="true"
                >
                  <title id="hamburger-icon">Ícone do menu</title>
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {isHamburgerOpen && (
                <div className={styles.hamburgerLinks}>
                  <Link href="/videos/popular">Populares</Link>
                </div>
              )}
            </div>
          ) : (
            <ul className={styles.navLinks}>
              <li className={styles.navItem} onClick={toggleDropdownNav}>
                <Link href="#">
                  <span className={styles.titleNavegation}>Navegar</span>
                </Link>
                {isDropdownNavOpen && (
                  <div ref={dropdownNavRef} className={styles.dropdownMenu}>
                    {/* Conteúdo do dropdown */}
                  </div>
                )}
              </li>
              <li className={styles.navItem} onClick={toggleDropdownNews}>
                <Link href="#">
                  <span className={styles.titleNews}>Notícias</span>
                </Link>
                {isDropdownNewsOpen && (
                  <div ref={dropdownNewsRef} className={`${styles.dropdownMenu} ${styles.newsDropdown}`}>
                    {/* Conteúdo do dropdown */}
                  </div>
                )}
              </li>
            </ul>
          )}
        </div>

        <div className={styles.headerActions}>
          <div className={styles.searchContainer}>
            <button onClick={handleSearchClick} className={styles.searchButton}>
              {/* Ícone de busca */}
            </button>
            <div onClick={handleWatchlistClick}>{/* Ícone de watchlist */}</div>
            <div onClick={handleUserClick}>{/* Ícone de conta */}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
