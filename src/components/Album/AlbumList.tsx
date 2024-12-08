// components/Album/AlbumList.tsx
import AlbumCard from './AlbumCard';
import { AlbumResponse } from '@/types/album';

interface Props {
  albums: AlbumResponse[];
}

const AlbumList = ({ albums }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {albums.length ? (
        albums.map((album) => (
          <AlbumCard key={album['@key']} album={album} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-400">No albums available</p>
      )}
    </div>
  );
};


export default AlbumList;
