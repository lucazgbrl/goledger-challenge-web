import AlbumsPage from "@/features/Album/AlbumsPage";
import useDocumentTitle from "@/hooks/useDocumentTite";

const AlbumsPageWrapper = () => {
  useDocumentTitle("Albums");

  return <AlbumsPage />;
};

export default AlbumsPageWrapper;
