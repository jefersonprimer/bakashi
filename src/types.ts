// src/types.ts
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
  audioType?: string;
  status?: string;
  isThumbnail?: boolean; 
  imageThumbnail?: string;
}

export interface Episode {
  id: number;
  animeId: number;
  season: number;
  title: string;
  image: string;
  videoUrl: string;
  releaseDate: string;
  isLancamento: boolean;
}

export interface AnimesData {
  Animes: Anime[];
  Episodes: Episode[];
}
