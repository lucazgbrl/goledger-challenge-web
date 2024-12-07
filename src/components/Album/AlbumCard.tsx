// components/Album/AlbumCard.tsx
import { AlbumResponse } from '../../types/album';

interface AlbumCardProps {
  album: AlbumResponse;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Displaying album's label (title) */}
      <h2 className="text-xl font-semibold text-gray-800">{album.label}</h2>
      
      {/* Render the album's description and other properties dynamically */}
      {album.props.map((prop) => (
        <div key={prop.label} className="mt-2">
          <p className="text-sm text-gray-600">{prop.label}: {prop.description || 'No description available'}</p>
        </div>
      ))}
    </div>
  );
};

export default AlbumCard;
