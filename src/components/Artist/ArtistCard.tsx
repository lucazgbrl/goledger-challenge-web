import { ArtistsReponse } from '@/types/artist';

interface ArtistCardProps {
  artist: ArtistsReponse;
}

const ArtistCard = ({ artist }: ArtistCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <h2 className="text-xl font-semibold text-gray-800">{artist.name}</h2>
    <p className="text-gray-600">{artist.country}</p>
  </div>
);

export default ArtistCard;
