import PlaylistsPage from "@/features/Playlist/PlaylistsPage";
import useDocumentTitle from "@/hooks/useDocumentTite";
import useFetchPlaylists from "@/hooks/useFetchPlaylists";

const PlaylistsPageWrapper = () => {
  const { playlists, loading } = useFetchPlaylists();

  useDocumentTitle("Playlists");

  if (loading) return <div className="text-center">Loading...</div>;

  return <PlaylistsPage playlists={playlists} />;
};

export default PlaylistsPageWrapper;