import PlaylistsPage from "@/features/Playlist/PlaylistsPage";
import useDocumentTitle from "@/hooks/useDocumentTite";

const PlaylistsPageWrapper = () => {

  useDocumentTitle("Playlists");

  return <PlaylistsPage />;
};


export default PlaylistsPageWrapper;