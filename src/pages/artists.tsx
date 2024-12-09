import ArtistsPage from '@/features/Artist/ArtistsPage';
import useDocumentTitle from '@/hooks/useDocumentTite';

const ArtistsPageWrapper = () => {
  useDocumentTitle('Artists');

  return <ArtistsPage />;
};

export default ArtistsPageWrapper;
