// hooks // useFetchPlaylists.ts
import { useState, useEffect } from "react";
import { getPlaylists } from "@/api/playlist";
import { PlaylistResponse } from "@/types/playlist";

const useFetchPlaylists = () => {
  const [playlists, setPlaylists] = useState<PlaylistResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const { result } = await getPlaylists();
        setPlaylists(result);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  return { playlists, loading, error };
};

export default useFetchPlaylists;
