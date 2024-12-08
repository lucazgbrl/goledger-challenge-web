// src/hooks/useFetchSongs.ts
import { useState, useEffect } from "react";
import { getSongs } from "@/api/song";
import { SongResponse, SongWithAlbumName } from "@/types/song";
import { fetchAlbumNames } from "@/utils/fetchAlbumNames";

const useFetchSongs = () => {
  const [songs, setSongs] = useState<SongWithAlbumName[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getSongs();

        if (!data) {
          throw new Error("No data returned from the server.");
        }

        if (!data.result || data.result.length === 0) {
          throw new Error("No songs found.");
        }

        const albumKeys = Array.from(
          new Set(data.result.map((song: SongResponse) => song.album["@key"]))
        );

        const albumNameMap = await fetchAlbumNames(albumKeys);

        const songsWithAlbumNames = data.result.map((song: SongResponse) => {
          const albumKey = song.album["@key"];
          const albumName = albumNameMap[albumKey];
          return { ...song, albumName };
        });

        setSongs(songsWithAlbumNames);
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  return { songs, loading, error };
};

export default useFetchSongs;
