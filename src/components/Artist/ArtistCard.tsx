import { ArtistsReponse } from '@/types/artist';

interface ArtistCardProps {
  artist: ArtistsReponse;
}

const ArtistCard = ({ artist }: ArtistCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <h2 className="text-xl font-semibold text-gray-800">{artist.label}</h2>
    <ul className="mt-2 space-y-1">
      {artist.props.map((prop, idx) => (
        <li key={idx} className="text-sm text-gray-600">
          <strong>{prop.label}:</strong> {prop.description}
        </li>
      ))}
    </ul>
  </div>
);

export default ArtistCard;
