// components/Album/AlbumList.tsx
import AlbumCard from './AlbumCard';
import { AlbumResponse } from '@/types/album';
import { useDeleteAlbum } from '@/hooks/useDeleteAlbum';
import { DeleteResponse } from '@/types/allAssets';

interface Props {
  albums: AlbumResponse[];
}

const AlbumList = ({ albums }: Props) => {
  const { deleteAlbum, loading, error } = useDeleteAlbum();

  const handleDelete = async (album: Record<string, unknown>) => {
    const response: DeleteResponse = await deleteAlbum({
      name: album.name,
      artist: album.artist,
    });
    if (response.deletedKeys) {
      alert("Album deleted successfully!");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {albums.map((album) => (
        <AlbumCard key={album['@key']} album={album} handleDelete={ handleDelete } loading={ loading } error={ error } />
      ))}
    </div>
  );
};

export default AlbumList;
