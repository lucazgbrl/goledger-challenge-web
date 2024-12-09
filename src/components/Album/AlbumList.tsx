// components/Album/AlbumList.tsx
import AlbumCard from './AlbumCard';
import LoadingMessage from '../loadingMessage';
import { AlbumResponse } from '@/types/album';

interface Props {
  albums: AlbumResponse[];
  onUpdate: (updatedAlbum: AlbumResponse) => void;
  onDelete: (deletedAlbum: AlbumResponse) => void;
}

const AlbumList = ({ albums, onDelete: handleDeleteAlbum, onUpdate: handleUpdateAlbum }: Props) => {
  if (albums.length === 0) {
    return <LoadingMessage pageName="albums" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {albums.length ? (
        albums.map((album) => (
          <AlbumCard key={album['@key']} album={album} onUpdate={ handleUpdateAlbum } onDelete={ handleDeleteAlbum } />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-400">No albums available</p>
      )}
    </div>
  );
};


export default AlbumList;
