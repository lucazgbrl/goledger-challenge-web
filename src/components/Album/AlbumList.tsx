// components/Album/AlbumList.tsx
import AlbumCard from './AlbumCard';
import { AlbumResponse } from '@/types/album';

interface Props {
  albums: AlbumResponse[];
}

const AlbumList = ({ albums }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {albums.map((album) => (
        <AlbumCard key={album.tag} album={album} />
      ))}
    </div>
  );
};

export default AlbumList;
