// components/Artist/ArtistList.tsx
import ArtistCard from './ArtistCard';
import { ArtistsReponse } from '@/types/artist';

interface Props {
  artists: ArtistsReponse[];
}

const ArtistList = ({ artists }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {artists.map((artist) => (
        <ArtistCard key={artist.tag} artist={artist} />
      ))}
    </div>
  );
};

export default ArtistList;
