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

  useEffect(() => {
    // Filtra os animes com base no termo de busca
    if (searchTerm) {
      const filtered = animesData.animes.filter((anime) =>
        anime.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAnimes(filtered);
      setIsOpen(true); // Exibe os resultados quando há algo para filtrar
    } else {
      setFilteredAnimes([]);
      setIsOpen(false); // Oculta os resultados quando a busca é limpa
    }
  }, [searchTerm]);

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

  // Função de redirecionamento quando o usuário pressionar Enter ou clicar no botão de pesquisa
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    if (searchTerm) {
      // Redireciona para a página de pesquisa
      router.push(`/search?query=${searchTerm}`);
    }
  };

  // Funções para alternar a visibilidade dos dropdowns
  const toggleDropdownNav = () => {
    setDropdownNavOpen((prevState) => !prevState);
  };

  const toggleDropdownNews = () => {
    setDropdownNewsOpen((prevState) => !prevState);
  };

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
          {/* Navegação com Dropdown */}
          <li className={styles.navItem} onClick={toggleDropdownNav}>
            <Link href="#">
              Navegar
              <FontAwesomeIcon icon={faCaretDown} className={styles.icon} />
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
                    <Link href="/watch">Episódios</Link>
                  </div>

                  {/* Divisória entre as colunas */}
                  <div className={styles.divider}></div>

                  {/* Coluna de Gêneros */}
                  <div className={styles.genresSection}>
                    <h3 className={styles.dropdownTitle}>GÊNEROS</h3>
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
              Notícias
              <FontAwesomeIcon icon={faCaretDown} className={styles.icon} />
            </Link>
            {isDropdownNewsOpen && (
              <div ref={dropdownNewsRef} className={`${styles.dropdownMenu} ${styles.newsDropdown}`}>
                <div className={styles.menuContent}>
                  <div className={styles.categoriesColumn}>
                    <Link href="/news/popular">Anunciamentos</Link>
                    <Link href="/news/new">Animes do Ano</Link>
                    <Link href="/news/alphabetical">Latest</Link>
                  </div>
                </div>
              </div>
            )}
          </li>
        </ul>

        {/* Área de Busca */}
        <form onSubmit={handleSearchSubmit} className={styles.search}>
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchSubmit(e);
              }
            }}
          />
          <button type="submit" className={styles.searchButton}>
            <FontAwesomeIcon icon={faSearch} />
          </button>

          {/* Exibe os resultados filtrados */}
          {isOpen && filteredAnimes.length > 0 && (
            <ul ref={resultsRef} className={styles.results}>
              {filteredAnimes.slice(0, 6).map((anime) => (
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
              {filteredAnimes.length > 6 && (
                <li className={styles.viewAll}>
                  <Link href={`/search?query=${searchTerm}`}>
                    Ver todos os resultados
                  </Link>
                </li>
              )}
            </ul>
          )}
        </form>
      </div>
    </header>
  );
}
