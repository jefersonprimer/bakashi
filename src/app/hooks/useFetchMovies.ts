import { useState, useEffect } from "react";
import { Anime } from "@/types/anime";

const useFetchMovies = () => {
  const [movies, setMovies] = useState<Anime[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movies"); // Endpoint para buscar os filmes
        if (!response.ok) {
          throw new Error("Erro ao buscar os filmes.");
        }
        const data = await response.json();
        setMovies(data.movies); // Supondo que os filmes estão na propriedade `movies`
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

export default useFetchMovies;
