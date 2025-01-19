'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Anime } from '@/types/anime';
import useFetchAnimes from '../../../hooks/useFetchAnimes'; // Usando o hook
import AnimeCarouselGenre from '../../../components/cards/AnimeCarouselGenre';

const genreMapping: Record<string, string> = {
  action: "Ação",
  adventure: "Aventura",
  comedy: "Comédia",
  drama: "Drama",
  fantasy: "Fantasia",
  historical: "Histórico",
  "post-apocalyptic": "Pós-Apocalíptico",
  "sci-fi": "Ficção Científica",
  supernatural: "Sobrenatural",
  thriller: "Suspense",
};

const GenreNewPage: React.FC = () => {
  const router = useRouter();
  const [genreInPortuguese, setGenreInPortuguese] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Usando o hook para obter os dados dos animes
  const { animesData, isLoading, error } = useFetchAnimes();

  // Efeito para obter o gênero da URL
  useEffect(() => {
    if (!router.query) {
      return; // Se router.query ainda não estiver disponível, não faz nada
    }

    const { genre } = router.query;

    if (genre && typeof genre === 'string') {
      const genreMapped = genreMapping[genre];
      if (genreMapped) {
        setGenreInPortuguese(genreMapped);
      }
    }

    setLoading(false); // Fim do carregamento
  }, [router.query]);

  // Mostra a tela de carregamento se o hook estiver carregando os dados
  if (isLoading || loading) {
    return <p>Carregando...</p>;
  }

  // Mostra mensagem de erro caso haja algum problema
  if (error) {
    return <p>Erro ao carregar os animes. Tente novamente mais tarde.</p>;
  }

  // Caso o gênero não seja encontrado
  if (!genreInPortuguese) {
    return <p>Gênero não encontrado.</p>;
  }

  // Verifica se animesData está definido e não é vazio
  if (!animesData || animesData.length === 0) {
    return <p>Não há animes disponíveis no momento.</p>;
  }

  // Filtra os animes de acordo com o gênero
  const filteredAnimes = animesData.filter((anime: Anime) =>
    anime.genres.includes(genreInPortuguese)
  );

  // Filtra os animes de novas estreias
  const newAnimes = filteredAnimes.filter((anime) => anime.isRelease);

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.mainTitle}>Novos Animes de {genreInPortuguese}</h1>
      <AnimeCarouselGenre animes={newAnimes} />
    </div>
  );
};

export default GenreNewPage;
