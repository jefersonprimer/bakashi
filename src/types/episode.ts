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

export interface EpisodesData {
  Episodes: Episode[];
}
