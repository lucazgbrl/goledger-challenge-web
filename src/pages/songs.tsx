import SongsPage from "@/features/Song/SongsPage";
import useFetchSongs from "@/hooks/useFetchSongs";

const SongsPageWrapper = () => {
  const { songs, loading, error } = useFetchSongs();

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return <SongsPage songs={songs} />;
};

export default SongsPageWrapper;