'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTv, faCalendar, faClock, faHistory, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';
import logo from '../../../../public/logo.png';
import animesData from '@/data/animes.json';
import { useRouter } from 'next/navigation';
import { Anime } from '@/types/anime'; // Importando a interface Anime

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [isOpen, setIsOpen] = useState(false); // Controla se os resultados estão visíveis
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Controla o dropdown de navegação
  const resultsRef = useRef<HTMLUListElement | null>(null); // Referência para o container dos resultados de pesquisa
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Referência para o container do menu dropdown
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
      (dropdownRef.current && !dropdownRef.current.contains(event.target as Node))
    ) {
      setIsOpen(false); // Fecha os resultados se clicar fora
      setDropdownOpen(false); // Fecha o dropdown se clicar fora
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

  // Função para alternar a visibilidade do dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
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
          <li className={styles.navItem} onClick={toggleDropdown}>
            <Link href="#">
              Navegação
              
              <FontAwesomeIcon icon={faCaretDown} className={styles.icon} />
            </Link>
            {/* Dropdown */}
            {isDropdownOpen && (
              <div ref={dropdownRef} className={styles.dropdownMenu}>
                <div className={styles.menuContent}>
                  {/* Coluna de Categorias (Popular, Novidades, A-Z) */}
                  <div className={styles.categoriesColumn}>
                    <div className={styles.categoryTitle}>Categorias</div>
                    <Link href="/videos/popular">Popular</Link>
                    <Link href="/videos/new">Novidades</Link>
                    <Link href="/videos/alphabetical">A-Z</Link>
                  </div>

                  {/* Divisória entre as colunas */}
                  <div className={styles.divider}></div>

                  {/* Coluna de Gêneros */}
                  <div className={styles.genresSection}>
                    <h3 className={styles.dropdownTitle}>Gêneros</h3>
                    <div className={styles.genresGrid}>
                      <div className={styles.genresColumn}>
                        <Link href="/videos/action">Ação</Link>
                        <Link href="/videos/adventure">Aventura</Link>
                        <Link href="/videos/comedy">Comédia</Link>
                        <Link href="/videos/drama">Drama</Link>
                        <Link href="/videos/fantasy">Fantasia</Link>
                      </div>
                      <div className={styles.genresColumn}>
                        <Link href="/series/music">Música</Link>
                        <Link href="/series/romance">Romance</Link>
                        <Link href="/series/sci-fi">Ficção Científica</Link>
                        <Link href="/series/seinen">Seinen</Link>
                        <Link href="/series/shoujo">Shoujo</Link>
                      </div>
                      <div className={styles.genresColumn}>
                        <Link href="/series/shounen">Shounen</Link>
                        <Link href="/series/slice-of-life">Slice-of-Life</Link>
                        <Link href="/series/sports">Esportes</Link>
                        <Link href="/series/supernatural">Sobrenatural</Link>
                        <Link href="/series/thriller">Suspense</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
          <li>
            <Link href="/series">
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
            <Link href="/watch">
              <FontAwesomeIcon icon={faClock} className={styles.icon} />
              Episódios
            </Link>
          </li>
          <li>
            <Link href="/history">
              <FontAwesomeIcon icon={faHistory} className={styles.icon} />
              Histórico
            </Link>
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
              {/* Exibe o link "Ver todos os resultados" se houver mais de 6 itens */}
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
