import { useState, useEffect } from "react";
import { getPlaylists } from "@/api/playlist";
import { PlaylistResponse } from "@/types/playlist";

const useFetchPlaylists = () => {
  const [playlists, setPlaylists] = useState<PlaylistResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true); // Reset loading state at the beginning
      setError(null); // Reset any previous error message

      try {
        const data = await getPlaylists();

        if (!data) {
          throw new Error("No data returned from the server.");
        }

        if (!data.result || data.result.length === 0) {
          throw new Error("No playlists found.");
        }

        setPlaylists(data.result);
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  return { playlists, loading, error };
};

export default useFetchPlaylists;
