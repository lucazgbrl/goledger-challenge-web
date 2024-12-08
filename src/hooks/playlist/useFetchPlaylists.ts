import { useEffect, useState } from "react";
import { Playlist, PlaylistResponse } from "@/types/playlist";
import { getPlaylists } from "@/api/playlist";
import fetchSongsFromPlaylist from "@/utils/fetchSongsFromPlaylist";
import useFetch from "@/hooks/useFetch";

const useFetchPlaylists = () => {
  const {
    data: playlists,
    loading,
    error,
  } = useFetch<PlaylistResponse>(getPlaylists);

  const [playlistsWithSongs, setPlaylistsWithSongs] = useState<Playlist[]>([]);

  useEffect(() => {
    if (playlists.length > 0) {
      const fetchSongsForPlaylists = async () => {
        try {
          const detailedPlaylists = await Promise.all(
            playlists.map(async (playlist: PlaylistResponse) => {
              const playlistWithSongs = await fetchSongsFromPlaylist(playlist);
              return {
                name: playlist.name,
                songs: playlistWithSongs.songs,
              };
            })
          );
          setPlaylistsWithSongs(detailedPlaylists);
        } catch (error) {
          console.error("Error fetching songs for playlists:", error);
        }
      };

      fetchSongsForPlaylists();
    }
  }, [playlists]);

  return { playlists: playlistsWithSongs, loading, error };
};

export default useFetchPlaylists;
