// src/components/VideoPlayer.tsx
import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  posterImage: string;
  nextEpisodeUrl?: string;
  prevEpisodeUrl?: string;
  episodeTitle?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  posterImage,
  nextEpisodeUrl,
  prevEpisodeUrl,
  episodeTitle
}) => {
  return (
    <div>
      <h2>{episodeTitle}</h2>
      <video controls poster={posterImage} width="100%">
        <source src={videoUrl} type="video/mp4" />
        Seu navegador não suporta o formato de vídeo.
      </video>
      
      <div>
        {prevEpisodeUrl && <a href={prevEpisodeUrl}>Episódio Anterior</a>}
        {nextEpisodeUrl && <a href={nextEpisodeUrl}>Próximo Episódio</a>}
      </div>
    </div>
  );
};

export default VideoPlayer;
