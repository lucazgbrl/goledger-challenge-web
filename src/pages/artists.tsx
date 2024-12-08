import useFetchArtists from '@/hooks/useFetchArtits';
import ArtistsPage from '../features/Artist/ArtistsPage';
import useDocumentTitle from '@/hooks/useDocumentTite';

const ArtistsPageWrapper = () => {
  const { artists, loading, error } = useFetchArtists();

  useDocumentTitle('Artists');


  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return <ArtistsPage artists={artists} />;
};

export default ArtistsPageWrapper;
