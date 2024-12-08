import { useState, useEffect } from "react";
import { Playlist, PlaylistResponse } from "@/types/playlist";
import { getPlaylists } from "@/api/playlist";
import fetchSongsFromPlaylist from "@/utils/fetchSongByKeys";

const useFetchPlaylists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        // Fetch playlists
        const response = await getPlaylists();

        if (!response) {
          throw new Error("Failed to fetch playlists.");
        }

        const playlists = response.result;

        // Fetch song details for each song in the playlist
        const playlistsWithSongs = await Promise.all(
          playlists.map(async (playlist: PlaylistResponse) => {
            const playlistWithSongs = await fetchSongsFromPlaylist(playlist);
            return {
              name: playlist.name,
              ...playlistWithSongs,
            };
          })
        );

        setPlaylists(playlistsWithSongs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  return { playlists, loading };
};

export default useFetchPlaylists;
