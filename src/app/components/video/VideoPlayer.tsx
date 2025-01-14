import React from "react";
import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps {
  videoUrl: string;
  posterImage?: string; // Opcional para imagem de poster
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, posterImage }) => {
  return (
    <div className={styles.videoContainer}>
      <iframe
        className={styles.videoIframe}
        src={videoUrl}
        frameBorder="0"
        scrolling="no"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="Video Player"
      />
    </div>
  );
};

export default VideoPlayer;
