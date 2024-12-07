import PlaylistsPage from "@/features/Playlist/PlaylistsPage";
import useDocumentTitle from "@/hooks/useDocumentTite";
import useFetchPlaylists from "@/hooks/playlist/useFetchPlaylists";

const PlaylistsPageWrapper = () => {
  const { playlists, loading } = useFetchPlaylists();

  useDocumentTitle("Playlists");

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <span className="text-lg text-white">Loading...</span>
      </div>
    );
  }

  return <PlaylistsPage playlists={playlists} />;
};


export default PlaylistsPageWrapper;