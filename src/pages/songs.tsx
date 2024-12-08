import SongsPage from "@/features/Song/SongsPage";
import useDocumentTitle from "@/hooks/useDocumentTite";
import useFetchSongs from "@/hooks/song/useFetchSongs";

const SongsPageWrapper = () => {
  const { songs, loading, error } = useFetchSongs();

  useDocumentTitle("Songs");


  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return <SongsPage songs={songs} />;
};

export default SongsPageWrapper;