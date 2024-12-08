import { useState, useEffect } from "react";
import { getArtists } from "@/api/artist";
import { ArtistsReponse } from "@/types/artist";

const useFetchArtists = () => {
  const [artists, setArtists] = useState<ArtistsReponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true); // Reset loading state at the beginning of fetch
      setError(null); // Reset any previous error message

      try {
        const data = await getArtists();

        if (!data) {
          throw new Error("No data found.");
        }

        if (!data.result || data.result.length === 0) {
          throw new Error("No artists found.");
        }

        setArtists(data.result);
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
