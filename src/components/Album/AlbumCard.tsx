import { AlbumResponse } from '../../types/album';

interface AlbumCardProps {
  album: AlbumResponse;
  handleDelete: (albumData: Record<string, unknown>) => void;
  loading: boolean;
  error: string | null;
}

const AlbumCard = ({ album, handleDelete, loading, error }: AlbumCardProps) => {
  return (
    <div className="p-4 border rounded-md shadow-md">
      <h3 className="text-lg font-semibold">{album.name}</h3>
      <p className="text-sm text-gray-500">{album.year}</p>
      <button
        onClick={() => handleDelete({ name: album.name, artist: album.artist })}
        disabled={loading}
        className={`mt-2 px-4 py-2 text-white bg-red-500 rounded-md ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
        }`}
      >
        {loading ? "Deleting..." : "Delete Album"}
      </button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default AlbumCard;
