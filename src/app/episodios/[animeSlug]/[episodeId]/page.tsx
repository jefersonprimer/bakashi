// src/app/episodios/[animeSlug]/[episodeId]/page.tsx
import { Animes, Episodes } from '@/data/animes.json';
import VideoPlayer from '../../../components/VideoPlayer';

// Tipagem explícita para os parâmetros
interface Params {
  animeSlug: string;
  episodeId: string;
}

interface Episode {
  id: number;
  animeId: number;
  season: number;
  title: string;
  videoUrl: string;
  releaseDate: string;
  isLancamento: boolean;
}

const EpisodePage = ({ params }: { params: Params }) => {
  // Acessando diretamente os parâmetros
  const { animeSlug, episodeId } = params;

  // Encontrando o anime correspondente
  const anime = Animes.find((anime) => anime.slug === animeSlug);

  if (!anime) {
    return <div>Anime não encontrado</div>;
  }

  // Encontrando o episódio correspondente
  const episode = Episodes.find((ep) => ep.id === parseInt(episodeId));

  if (!episode) {
    return <div>Episódio não encontrado</div>;
  }

  return (
    <div>
      <h1>{anime.name} - {episode.title}</h1>
      <p>Lançado em: {episode.releaseDate}</p>

      {/* Se o episódio for um lançamento, exibe a label */}
      {episode.isLancamento && <span className="label">LANÇAMENTO</span>}

      {/* Player de vídeo */}
      <VideoPlayer src={episode.videoUrl} />
    </div>
  );
};

export default EpisodePage;
