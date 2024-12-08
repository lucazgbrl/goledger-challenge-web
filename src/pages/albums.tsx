import AlbumsPage from "@/features/Album/AlbumsPage";
import useDocumentTitle from "@/hooks/useDocumentTite";
import useFetchAlbums from "@/hooks/album/useFetchAlbums";

const AlbumsPageWrapper = () => {
  const { albums, loading, error } = useFetchAlbums();

  useDocumentTitle("Albums");

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return <AlbumsPage albums={albums} />;
};

export default AlbumsPageWrapper;
