import ArtistCard from './ArtistCard';
import LoadingMessage from '../loadingMessage';
import { ArtistsReponse } from '@/types/artist';

interface Props {
  artists: ArtistsReponse[];
  onDeleteArtist: (artistName: string) => void;
  onUpdateArtist: (updatedArtist: ArtistsReponse) => void;
}

const ArtistList = ({ artists, onDeleteArtist: handleDeleteArtist, onUpdateArtist: handleUpdateArtist }: Props) => {
  if (!artists.length) {
    return <LoadingMessage pageName="artists" />;
  }

  return (
    <ul className="space-y-4">
      {artists.map((artist) => (
        <li key={artist['@key']}>
          <ArtistCard artist={artist} onDeleteArtist={ handleDeleteArtist } onUpdateArtist={ handleUpdateArtist } />
        </li>
      ))}
    </ul>
  );
};

export default ArtistList;
