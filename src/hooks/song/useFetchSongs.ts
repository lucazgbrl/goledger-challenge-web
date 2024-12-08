import { useEffect, useState } from "react";
import { SongResponse, SongWithAlbumName } from "@/types/song";
import { getSongs } from "@/api/song";
import { fetchAlbumNames } from "@/utils/fetchAlbumNames";
import useFetch from "@/hooks/useFetch";

const useFetchSongs = () => {
  const {
    data: songsResponse,
    loading,
    error,
  } = useFetch<SongResponse>(getSongs);

  const [songsWithAlbumNames, setSongsWithAlbumNames] = useState<
    SongWithAlbumName[]
  >([]);

  useEffect(() => {
    const enrichSongsWithAlbumNames = async () => {
      if (songsResponse.length > 0) {
        try {
          const albumKeys = Array.from(
            new Set(songsResponse.map((song) => song.album["@key"]))
          );

          const albumNameMap = await fetchAlbumNames(albumKeys);

          const enrichedSongs = songsResponse.map((song) => ({
            ...song,
            albumName: albumNameMap[song.album["@key"]] || "Unknown Album",
          }));

          setSongsWithAlbumNames(enrichedSongs);
        } catch (error) {
          console.error("Error enriching songs with album names:", error);
        }
      }
    };

    enrichSongsWithAlbumNames();
  }, [songsResponse]);

  return { songs: songsWithAlbumNames, loading, error };
};

export default useFetchSongs;
