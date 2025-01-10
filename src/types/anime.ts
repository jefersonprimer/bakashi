// src/types/anime.ts

export type AudioType = 'Dublado' | 'Legendado';
export type Status = 'Em exibição' | 'Finalizado' | 'Pausado' | 'Não anunciado';

export interface Anime {
  id: number;
  name: string;
  slug: string;
  data: string;
  image: string;
  synopsis: string;
  isLancamento: boolean;
  rating: number;
  score: number;
  genres: string[];
  airing: string;
  episodes: number;
  season: number;
  isNextSeason: boolean;
  audioType?: AudioType;
  status?: Status;
  isThumbnail?: boolean;
  imageThumbnail?: string;
}

export interface AnimesData {
  Animes: Anime[];
}
