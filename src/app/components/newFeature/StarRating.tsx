import { useState } from 'react';
import './StarRating.module.css'

interface RatingProps {
  animeId: number; // ID do anime para salvar o voto
  initialRating: number; // Média inicial
  totalVotes: number; // Total de votos recebidos
}

const StarRating: React.FC<RatingProps> = ({ animeId, initialRating, totalVotes }) => {
  const [userRating, setUserRating] = useState<number | null>(null); // Nota do usuário
  const [averageRating, setAverageRating] = useState<number>(initialRating); // Média
  const [votes, setVotes] = useState<number>(totalVotes); // Total de votos

  const handleVote = (rating: number) => {
    // Simulação de envio do voto para o backend
    console.log(`Voto enviado: ${rating} para animeId: ${animeId}`);
    setUserRating(rating);

    // Atualizar média e total de votos (simulação de resposta do servidor)
    const newVotes = votes + 1;
    const newAverage = (averageRating * votes + rating) / newVotes;
    setVotes(newVotes);
    setAverageRating(Number(newAverage.toFixed(1))); // Arredondar para 1 casa decimal
  };

  return (
    <div
      itemScope
      itemType="http://schema.org/AggregateRating"
      className="starstruck-wrap"
    >
      <meta itemProp="bestRating" content="10" />
      <meta itemProp="worstRating" content="1" />
      <meta itemProp="ratingValue" content={averageRating.toString()} />
      <meta itemProp="ratingCount" content={votes.toString()} />

      <div className="dt_rating_data">
        <div
          className="starstruck starstruck-main"
          data-id={animeId}
          data-type="post"
          style={{ cursor: 'pointer' }}
        >
          {[...Array(10)].map((_, index) => {
            const starValue = index + 1;
            const isRated = userRating && userRating >= starValue;
            return (
              <i
                key={starValue}
                data-alt={starValue}
                className={isRated ? 'star-on-png' : 'star-off-png'}
                title={`+${starValue}`}
                onClick={() => handleVote(starValue)}
                style={{ color: isRated ? 'gold' : 'gray', margin: '0 4px' }}
              >
                ★
              </i>
            );
          })}
          <input name="score" type="hidden" value={userRating || 0} />
        </div>

        {/* Nota do Usuário */}
        <section className="nope starstruck-rating-wrap">
          Seu voto: <span className="rating-yours">{userRating || '-'}</span>
        </section>

        {/* Média e Total de Votos */}
        <div className="starstruck-rating">
          <span className="dt_rating_vgs" itemProp="ratingValue">
            {averageRating}
          </span>
          <i className="fas fa-user-circle"></i>
          <span className="rating-count" itemProp="ratingCount">
            {votes}
          </span>
          <span className="rating-text">votos</span>
        </div>
      </div>
    </div>
  );
};

export default StarRating;

{/* <div itemscope="" class="starstruck-wrap" itemprop="aggregateRating" itemtype="http://schema.org/AggregateRating"><meta itemprop="bestRating" content="10"><meta itemprop="worstRating" content="1"><div class="dt_rating_data"><div class="starstruck starstruck-main " data-id="40640" data-rating="10" data-type="post" style="cursor: pointer;"><i data-alt="1" class="star-on-png" title="+1"></i>&nbsp;<i data-alt="2" class="star-on-png" title="+2"></i>&nbsp;<i data-alt="3" class="star-on-png" title="+3"></i>&nbsp;<i data-alt="4" class="star-on-png" title="+4"></i>&nbsp;<i data-alt="5" class="star-on-png" title="+5"></i>&nbsp;<i data-alt="6" class="star-on-png" title="+6"></i>&nbsp;<i data-alt="7" class="star-on-png" title="+7"></i>&nbsp;<i data-alt="8" class="star-on-png" title="+8"></i>&nbsp;<i data-alt="9" class="star-on-png" title="+9"></i>&nbsp;<i data-alt="10" class="star-on-png" title="+10"></i><input name="score" type="hidden" value="10"></div><section class="nope starstruck-rating-wrap">Sua Nota: <span class="rating-yours">10</span></section><div class="starstruck-rating"><span class="dt_rating_vgs" itemprop="ratingValue" style="display: inline;">10</span><i class="fas fa-user-circle"></i> <span class="rating-count" itemprop="ratingCount">5</span> <span class="rating-text">votes</span></div></div></div> */}