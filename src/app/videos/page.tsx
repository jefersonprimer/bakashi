'use client'

import React from 'react';
import { Anime } from '@/types/anime';
import animesData from '@/data/animes.json';
import AnimeCarousel from '../components/cards/AnimeCarousel'; // Importe o AnimeCarousel

const Videos: React.FC = () => {
  const animes: Anime[] = animesData.animes;

  return (
    <div>
      <h1>Todos os Animes</h1>

      {/* AnimeCarousel passando os animes como prop */}
      <AnimeCarousel animes={animes} />
    </div>
  );
};

export default Videos;
