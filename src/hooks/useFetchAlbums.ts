// hooks/useFetchAlbums.ts
import { useState, useEffect } from "react";
import { getAlbums } from "@/api/album";
import { AlbumResponse } from "@/types/album";

const useFetchAlbums = () => {
  const [albums, setAlbums] = useState<AlbumResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await getAlbums();
        if (data) {
          setAlbums(data.result);
        } else {
          setAlbums([]);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  return { albums, loading, error };
};

export default useFetchAlbums;
