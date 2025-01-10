"use client";

import AnimeCarousel from "./AnimeCarousel"; // Importe o AnimeCarousel existente
import { Anime } from "@/types/anime"; // Importe a interface de tipagem
import animesData from "@/data/animes.json"; // Importa o JSON diretamente
import styles from "./AnimeCarouselLancamentos.module.css";

interface AnimeCarouselLancamentosProps {
  itemsPerPage?: number;
  className?: string; // Propriedade opcional
}

const AnimeCarouselLancamentos: React.FC<AnimeCarouselLancamentosProps> = ({
  itemsPerPage = 5,
}) => {
  // Acessar a propriedade "Animes" e filtrar os lançamentos
  const lancamentos: Anime[] = animesData.Animes.filter(
    (anime) => anime.isLancamento
  );

  return (
    <div className="anime-carousel-lancamentos">
      <h1 className={styles.titulo}>
        Uma amostra da temporada de outubro de 2024
      </h1>{" "}
      {/* Título H1 adicionado */}
      <p className={styles.subtitulo}>
        Assista os três primeiros episódios desses simulcasts de outubro de 2024
        de graça!
      </p>
      <AnimeCarousel animes={lancamentos} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default AnimeCarouselLancamentos;
