// hooks // useFetchSongs.ts
import { useState, useEffect } from "react";
import { getSongs } from "@/api/song";
import { SongResponse } from "@/types/song";

const useFetchSongs = () => {
  const [songs, setSongs] = useState<SongResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const { result } = await getSongs();
        setSongs(result);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  return { songs, loading, error };
};

export default useFetchSongs;
