import { useState } from "react";
import { AlbumResponse } from '../../types/album';
import { useDeleteAlbum } from '@/hooks/album/useDeleteAlbum';
import { useUpdateAlbum } from "@/hooks/album/useUpdateAlbum";
import { DeleteResponse } from '@/types/allAssets';

interface AlbumCardProps {
  album: AlbumResponse;
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  const { deleteAlbum, loading: deleteLoading, error: deleteError } = useDeleteAlbum();
  const { updateAlbum, loading: updateLoading, error: updateError, success } = useUpdateAlbum();

  // Local state for updating the album
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedYear, setUpdatedYear] = useState<number | undefined >(album.year);

  // Handle album delete
  const handleDelete = async (album: AlbumResponse) => {
    const response: DeleteResponse = await deleteAlbum({
      name: album.name,
      artist: album.artist,
    });
    if (response.deletedKeys) {
      alert("Album deleted successfully!");
    }
  };

  // Handle album update
  const handleUpdate = async () => {
    const updatedData = {
      name: album.name,
      artist: album.artist,
      year: updatedYear,
    };

    await updateAlbum(updatedData);

    if (!updateError) {
      alert("Album updated successfully!");
      setIsEditing(false);
    } else {
      alert("Failed to update album.");
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h3 className="text-lg font-semibold">{album.name}</h3>
      <p className="text-sm text-gray-500">{album.year}</p>
      {isEditing ? (
        <div className="mt-2">
          <input
            type="number"
            value={updatedYear}
            onChange={(e) => setUpdatedYear(Number(e.target.value))}
            className="ml-2 border rounded-md px-2 py-1"
            placeholder="Enter new year"
          />
          <button
            onClick={handleUpdate}
            disabled={updateLoading}
            className={`ml-2 px-4 py-2 text-white bg-blue-500 rounded-md ${updateLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
          >
            {updateLoading ? "Updating..." : "Update Album"}
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
          >
            Edit Album
          </button>
        </>
      )}
      <button
        onClick={() => handleDelete({ name: album.name, artist: album.artist })}
        disabled={deleteLoading}
        className={`mt-2 px-4 py-2 text-white bg-red-500 rounded-md ${deleteLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"}`}
      >
        {deleteLoading ? "Deleting..." : "Delete Album"}
      </button>
      {deleteError && <p className="mt-2 text-sm text-red-500">{deleteError}</p>}
      {updateError && <p className="mt-2 text-sm text-red-500">{updateError}</p>}
    </div>
  );
};

export default AlbumCard;
