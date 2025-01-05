// src/components/VideoPlayer.tsx

import React from 'react';

interface VideoPlayerProps {
  src: string;  // Adicionando a propriedade `src` ao tipo
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  return (
    <div>
      <video controls width="100%" height="auto">
        <source src={src} type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>
    </div>
  );
};

export default VideoPlayer;
