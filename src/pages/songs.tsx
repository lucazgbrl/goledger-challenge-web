import SongsPage from "@/features/Song/SongsPage";
import useDocumentTitle from "@/hooks/useDocumentTite";

const SongsPageWrapper = () => {
  useDocumentTitle("Songs");

  return <SongsPage />;
};

export default SongsPageWrapper;