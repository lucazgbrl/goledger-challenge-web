import { ArtistsReponse } from '@/types/artist';
import useDeleteArtist from '@/hooks/artist/useDeleteArtist';
import { useUpdateArtist } from '@/hooks/artist/useUpdateArtist';
import { useState } from 'react';

interface ArtistCardProps {
  artist: ArtistsReponse;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  const { deleteArtist, loading: deleteLoading, error: deleteError } = useDeleteArtist();
  const { updateArtist, loading: updateLoading, error: updateError, success } = useUpdateArtist();

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
    <div className="p-4 border rounded-md shadow-md">
      <h3 className="text-lg font-semibold">{artist.name}</h3>
      {isEditing ? (
        <div className="mt-2">
          <input
            type="text"
            value={updatedCountry}
            onChange={(e) => setUpdatedCountry(e.target.value)}
            className="ml-2 border rounded-md px-2 py-1"
            placeholder="Enter new country"
          />
          <button
            onClick={handleUpdate}
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-md"
          >
            Update
          </button>
        </div>
      ) : (
        <div className="mt-2">
          <p className="text-sm text-gray-500">{artist.country}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-md"
          >
            Edit
          </button>
        </div>
      )}
      <button
        onClick={() => handleDelete(artist.name)}
        className="mt-2 bg-red-500 text-white px-4 py-1 rounded-md"
      >
        Delete
      </button>
    </div>
  );
}

export default ArtistCard;
