'use client';

import AnimeCarousel from './AnimeCarousel'; // Importe o AnimeCarousel existente
import { Anime } from '../../types'; // Importe a interface de tipagem
import animesData from '../../data/animes.json'; // Importa o JSON diretamente

interface AnimeCarouselTodosProps {
  itemsPerPage?: number;
}

const AnimeCarouselTodos: React.FC<AnimeCarouselTodosProps> = ({ itemsPerPage = 5 }) => {
  // Acessar todos os animes sem filtro
  const todosAnimes: Anime[] = animesData.Animes;

  return (
    <div>
      <h1>Todos os Animes</h1> {/* Título H1 adicionado */}
      <AnimeCarousel animes={todosAnimes} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselTodos;
