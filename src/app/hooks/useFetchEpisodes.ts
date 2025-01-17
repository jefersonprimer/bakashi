import { useState, useEffect } from 'react';
import axios from 'axios';
import { Episode } from '@/types/episode'; // Certifique-se de que a interface `Episode` está correta.

const useFetchEpisodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get('https://bakashi-backend.vercel.app/api/episodes');
        setEpisodes(response.data.episodes); // Certifique-se de acessar a propriedade correta.
      } catch (err) {
        console.error(err);
        setError('Erro ao buscar os episódios.');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  return { episodes, loading, error };
};

export default useFetchEpisodes;
