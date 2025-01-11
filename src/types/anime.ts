// Definição do tipo para áudio
export type AudioType = 'Dublado' | 'Legendado' | 'Dub | Leg';

// Definição do tipo para gênero
export type Genre = 'Ação' | 'Fantasia' | 'Aventura' | 'Comédia' | 'Drama' | 'Shoujo';

// Definição do tipo para o dia da semana em que o anime é transmitido
export type AiringDay = 'Segunda-feira' | 'Terça-feira' | 'Quarta-feira' | 'Quinta-feira' | 'Sexta-feira' | 'Sábado' | 'Domingo';

// Interface para o objeto Anime
export interface Anime {
  isRelease: boolean;
  isPopularSeason: boolean;
  isNextSeason: boolean;
  isThumbnail: boolean;
  isMovie: boolean;
  id: string;
  slug: string;
  name: string;
  releaseYear: string;
  image: string;
  synopsis: string;
  rating: number;
  score: number;
  genres: Genre[]; // Agora o tipo é um array de Genre
  airingDay: AiringDay;
  episodes: number;
  season: number;
  audioType: AudioType;
  thumbnailImage: string;
}

// Interface para o conjunto de animes
export interface AnimeData {
  animes: Anime[]; 
}
