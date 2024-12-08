import ArtistsPage from '../features/Artist/ArtistsPage';
import useDocumentTitle from '@/hooks/useDocumentTite';
import { getArtists } from '@/api/artist';
import useFetch from '@/hooks/useFetch';

const ArtistsPageWrapper = () => {
  const { data: artists, loading, error } = useFetch(() => getArtists());

  useDocumentTitle('Artists');


  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return <ArtistsPage artists={artists} />;
};

export default ArtistsPageWrapper;
