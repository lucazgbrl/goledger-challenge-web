import AlbumsPage from "@/features/Album/AlbumsPage";
import useFetchAlbums from "@/hooks/useFetchAlbums";

const AlbumsPageWrapper = () => {
  const { albums, loading, error } = useFetchAlbums();

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return <AlbumsPage albums={albums} />;
};

export default AlbumsPageWrapper;
