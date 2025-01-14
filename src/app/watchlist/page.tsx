"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Anime } from "../../types/anime";
import animesData from "../../data/animes.json"; 
import styles from "./styles.module.css";

const ListaPage = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const animeId = searchParams.get("id"); 

  useEffect(() => {
    const storedList = localStorage.getItem("animeList");
    if (storedList) {
      setAnimeList(JSON.parse(storedList));
    }

    if (animeId) {
      const anime = animesData.animes.find((a) => a.id === Number(animeId));
      if (anime) {
        if (!animeList.some((a) => a.id === anime.id)) {
          const confirmAdd = confirm(
            `O anime "${anime.name}" não está na lista. Deseja adicionar?`
          );
          if (confirmAdd) {
            handleAddAnime(anime);
          }
        }
      }
    }
  }, [animeId]);

  const handleAddAnime = (anime: Anime) => {
    if (animeList.length >= 20) {
      alert("Lista cheia. Remova um anime para adicionar outro.");
      return;
    }

    if (!animeList.find((a) => a.id === anime.id)) {
      const updatedList = [...animeList, anime];
      setAnimeList(updatedList);
      localStorage.setItem("animeList", JSON.stringify(updatedList));
    }
  };

  const handleRemoveAnime = (id: number) => {
    const updatedList = animeList.filter((anime) => anime.id !== id);
    setAnimeList(updatedList);
    localStorage.setItem("animeList", JSON.stringify(updatedList));
  };

  const handlePlusClick = (animeId: number) => {
    const anime = animesData.animes.find((a) => a.id === animeId);
    if (anime) {
      handleAddAnime(anime);
    }
  };

  return (
    <div className={styles.listPage}>
      <h1>Sua Lista de Animes</h1>
      {animeList.length === 0 ? (
        <p>Sua lista está vazia. Adicione animes!</p>
      ) : (
        <ul className={styles.list}>
          {animeList.map((anime) => (
            <li key={anime.id} className={styles.listItem}>
              <img
                src={anime.image}
                alt={anime.name}
                className={styles.image}
              />
              <div className={styles.info}>
                <h3>{anime.name}</h3>
                <button
                  onClick={() => handleRemoveAnime(anime.id)}
                  className={styles.removeButton}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.animeGrid}>
        <h2>Adicionar Mais Animes</h2>
        {animesData.animes.map((anime) => (
          <div key={anime.id} className={styles.animeCard}>
            <img src={anime.image} alt={anime.name} className={styles.image} />
            <div className={styles.cardButtons}>
              <button
                onClick={() => router.push(`/lista?id=${anime.id}`)}
                className={styles.bookmarkButton}
              >
                Bookmark
              </button>
              <button
                onClick={() => handlePlusClick(anime.id)}
                className={styles.plusButton}
              >
                Plus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaPage;
