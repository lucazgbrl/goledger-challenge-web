import { AlbumResponse } from '../../types/album';
import { useDeleteAlbum } from '@/hooks/album/useDeleteAlbum';
import { DeleteResponse } from '@/types/allAssets';

interface AlbumCardProps {
  album: AlbumResponse;
}

const AlbumCard = ({ album}: AlbumCardProps) => {
  const { deleteAlbum, loading, error } = useDeleteAlbum();

  const handleDelete = async (album: AlbumResponse) => {
    const response: DeleteResponse = await deleteAlbum({
      name: album.name,
      artist: album.artist,
    });
    if (response.deletedKeys) {
      alert("Album deleted successfully!");
    }
  };

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
