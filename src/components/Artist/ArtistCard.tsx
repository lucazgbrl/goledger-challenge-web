import { ArtistsResponse } from '@/types/artist';
import useDeleteArtist from '@/hooks/artist/useDeleteArtist';
import { useUpdateArtist } from '@/hooks/artist/useUpdateArtist';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ArtistCardProps {
  artist: ArtistsResponse;
  onUpdateArtist: (updatedArtist: ArtistsResponse) => void;
  onDeleteArtist: (artistName: string) => void;
}

const ArtistCard = ({ artist, onDeleteArtist, onUpdateArtist }: ArtistCardProps) => {
  const { deleteArtist, error: deleteError } = useDeleteArtist();
  const { updateArtist, error: updateError } = useUpdateArtist();
  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedCountry, setUpdatedCountry] = useState<string>(artist.country);

  const handleDelete = async (artist: string) => {
    await deleteArtist(artist);
    onDeleteArtist(artist);
    
    if(deleteError) {
      toast.error(`Failed to delete artist: ${deleteError}`);
    } else {
      toast.success(`Artist: ${artist} deleted successfully`);
    }
  }

  const handleUpdate = async () => {
    const updatedData = {
      name: artist.name,
      country: updatedCountry,
      "@key": artist["@key"],
    };

    await updateArtist(updatedData);

    if (!updateError) {
      onUpdateArtist(updatedData);
      alert("Artist updated successfully!");
      setIsEditing(false);
    } else {
      alert("Failed to update artist.");
    }
  };

  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-black rounded-lg shadow-2xl p-6">
      <div>
        <h3 className="text-xl font-semibold text-white">{artist.name}</h3>
        {isEditing ? (
          <input
            type="text"
            value={updatedCountry}
            onChange={(e) => setUpdatedCountry(e.target.value)}
            className="mt-2 border border-gray-600 rounded-md px-2 py-1 text-white bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter new country"
          />
        ) : (
          <p className="text-sm text-gray-400">{artist.country}</p>
        )}
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Update
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition duration-300"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => handleDelete(artist.name)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ArtistCard;
