// components/Artist/ArtistList.tsx
import ArtistCard from './ArtistCard';
import { ArtistsReponse } from '@/types/artist';
import useDeleteArtist from '@/hooks/useDeleteArtist';

interface Props {
  artists: ArtistsReponse[];
}

const ArtistList = ({ artists }: Props) => {
  const { deleteArtist, loading, error } = useDeleteArtist();

  const handleDelete = async (artist: string) => {
    await deleteArtist(artist);
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {artists.map((artist) => (
        <ArtistCard key={artist['@key']} artist={artist} handleDelete={ handleDelete } loading={loading} error={error} />
      ))}
    </div>
  );
};

export default ArtistList;
