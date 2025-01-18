"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Anime } from "../../types/anime";
import useFetchAnimes from "../hooks/useFetchAnimes"; // Importando o hook
import AnimeGrid from "../components/cards/AnimeGrid"; // Importando AnimeGrid
import styles from "./styles.module.css";

const ListaPage = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const { animes, loading, error } = useFetchAnimes(); // Usando o hook aqui
  const router = useRouter();
  const searchParams = useSearchParams();
  const animeId = searchParams.get("id");

  useEffect(() => {
    const storedList = localStorage.getItem("animeList");
    if (storedList) {
      setAnimeList(JSON.parse(storedList));
    }

    if (animeId && animes.length > 0) {
      const anime = animes.find((a) => a.id === Number(animeId));
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
  }, [animeId, animes, animeList]);

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
    const anime = animes.find((a) => a.id === animeId);
    if (anime) {
      handleAddAnime(anime);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

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

      {/* Exibindo o AnimeGrid com a lista de animes restantes */}
      <div className={styles.animeGrid}>
        <AnimeGrid
          animes={animes}
          handleAddAnime={handleAddAnime}
          handlePlusClick={handlePlusClick} // Passando a função para o AnimeGrid
        />
      </div>
    </div>
  );
};

export default ListaPage;
