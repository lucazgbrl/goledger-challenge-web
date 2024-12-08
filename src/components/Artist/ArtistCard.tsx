import { ArtistsReponse } from '@/types/artist';
import useDeleteArtist from '@/hooks/artist/useDeleteArtist';
import { useUpdateArtist } from '@/hooks/artist/useUpdateArtist';
import { useState } from 'react';

interface ArtistCardProps {
  artist: ArtistsReponse;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  const { deleteArtist } = useDeleteArtist();
  const { updateArtist, error: updateError } = useUpdateArtist();

  const handleDelete = async (artist: string) => {
    await deleteArtist(artist);
  }

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [updatedCountry, setUpdatedCountry] = useState<string | undefined>(artist.country);

  const handleUpdate = async () => {
    const updatedData = {
      name: artist.name,
      country: updatedCountry,
    };

    await updateArtist(updatedData);

    if (!updateError) {
      alert("Artist updated successfully!");
      setIsEditing(false);
    } else {
      alert("Failed to update artist.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-black rounded-lg shadow-2xl p-6 max-w-sm mx-auto mb-4 hover:scale-105 transition duration-300">
      <h3 className="text-xl font-semibold text-white">{artist.name}</h3>
      {isEditing ? (
        <div className="mt-2">
          <input
            type="text"
            value={updatedCountry}
            onChange={(e) => setUpdatedCountry(e.target.value)}
            className="ml-2 border border-gray-600 rounded-md px-2 py-1 text-white bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter new country"
          />
          <button
            onClick={handleUpdate}
            className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-full"
          >
            Update
          </button>
        </div>
      ) : (
        <div className="mt-2">
          <p className="text-sm text-gray-400">{artist.country}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition duration-300 w-full"
          >
            Edit
          </button>
        </div>
      )}
      <button
        onClick={() => handleDelete(artist.name)}
        className="mt-2 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-300 w-full"
      >
        Delete
      </button>
    </div>
  );
}

export default ArtistCard;
