import { useState, useEffect } from 'react';
import axios from 'axios';
import { Anime } from '@/types/anime'; // Garanta que a interface `Anime` está correta.

const useFetchAnimes = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await axios.get('https://bakashi-backend.vercel.app/api/animes');
        setAnimes(response.data.animes); // Certifique-se de acessar a propriedade correta.
      } catch (err) {
        console.error(err);
        setError('Erro ao buscar os animes.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  return { animes, loading, error };
};

export default useFetchAnimes;
