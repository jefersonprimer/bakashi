// components/AddToWatchlistButton.tsx
"use client";

import { useAnimeList } from "../../contexts/AnimeListContext";
import styles from "./AddToWatchlistButton.module.css";

interface AddToWatchlistButtonProps {
  anime: Anime;
}

const AddToWatchlistButton: React.FC<AddToWatchlistButtonProps> = ({ anime }) => {
  const { addToWatchlist } = useAnimeList();

  const handleAddToWatchlist = () => {
    addToWatchlist(anime);
    window.location.href = "/watchlist"; // Redireciona para a página Watchlist
  };

  return (
    <div className={styles.tooltip} onClick={handleAddToWatchlist}>
      <span className={styles.tooltipText}>Add to Watchlist</span>
      <svg
        className={styles.iconBookmark}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-labelledby="watchlist-svg"
        aria-hidden="false"
        role="img"
      >
        <title id="watchlist-svg">Watchlist</title>
        <path d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z" />
      </svg>
    </div>
  );
};

export default AddToWatchlistButton;
