import PlaylistsPage from "@/features/Playlist/PlaylistsPage";
import useFetchPlaylists from "@/hooks/useFetchPlaylists";

const PlaylistsPageWrapper = () => {
  const { playlists, loading, error } = useFetchPlaylists();

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return <PlaylistsPage playlists={playlists} />;
};

export default PlaylistsPageWrapper;