import { ArtistsReponse } from '@/types/artist';

interface ArtistCardProps {
  artist: ArtistsReponse;
  handleDelete: (artist: string) => void;
  loading: boolean;
  error: string | null;
}

const ArtistCard = ({ artist, handleDelete, loading, error }: ArtistCardProps) => (
  <div className="bg-white rounded-lg shadow-lg p-4">
    <div className="flex justify-between">
      <h3 className="text-lg font-semibold">{artist.name}</h3>
      <button
        className="text-red-500"
        onClick={() => handleDelete(artist.name)}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default ArtistCard;
