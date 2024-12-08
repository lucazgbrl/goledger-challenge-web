// components/Album/AlbumCard.tsx
import { AlbumResponse } from '../../types/album';

interface AlbumCardProps {
  album: AlbumResponse;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800">{album.name}</h2>
      <p className="text-gray-600 mt-2">{album.year}</p>
    </div>
  );
};

export default AlbumCard;
