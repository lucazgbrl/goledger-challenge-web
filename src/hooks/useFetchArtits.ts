import { useState, useEffect } from "react";
import { getArtists } from "@/api/artist";
import { ArtistsReponse } from "@/types/artist";

const useFetchArtists = () => {
  const [artists, setArtists] = useState<ArtistsReponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const { result } = await getArtists();
        setArtists(result);
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return { artists, loading, error };
};

export default useFetchArtists;
