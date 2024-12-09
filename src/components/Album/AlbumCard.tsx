import { useState } from "react";
import { AlbumResponse } from '../../types/album';
import { useDeleteAlbum } from '@/hooks/album/useDeleteAlbum';
import { useUpdateAlbum } from "@/hooks/album/useUpdateAlbum";
import { toast } from "react-toastify";
import Link from "next/link";

interface AlbumCardProps {
  album: AlbumResponse;
  onUpdate: (updatedAlbum: AlbumResponse) => void;
  onDelete: (deletedAlbum: AlbumResponse) => void;
}

const AlbumCard = ({ album, onUpdate, onDelete }: AlbumCardProps) => {
  const { deleteAlbum, loading: deleteLoading, error: deleteError } = useDeleteAlbum();
  const { updateAlbum, loading: updateLoading, error: updateError } = useUpdateAlbum();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedYear, setUpdatedYear] = useState<string | number >(String(album.year));

  const handleDelete = async (album: AlbumResponse) => {
   await deleteAlbum({
      name: album.name,
      artist: album.artist,
    });

    onDelete(album);

    if (deleteError) {
      toast.error(`Error deleting album: ${deleteError}`);
    } else {
      toast.success(`Album: ${album.name} deleted successfully`);
    }
  };

  const handleUpdate = async () => {
    const updatedData = {
      name: album.name,
      artist: album.artist,
      year: updatedYear,
    };

    await updateAlbum(updatedData);

    if(updateError) {
      toast.error("Error updating album");
    } else {
      toast.success("Album updated successfully");
      onUpdate(updatedData);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-black rounded-lg shadow-2xl p-6 max-w-sm mx-auto mb-4 hover:scale-105 transition duration-300">
      <Link href={`albums/${album.name}`}>
        <h3 className="text-lg font-semibold">{album.name}</h3>
        <p className="text-sm text-black-500">{album.year}</p>
      </Link>
      {isEditing ? (
        <div className="mt-2">
          <input
            type="text"
            value={updatedYear || ''}
            onChange={(e) => setUpdatedYear(e.target.value)}
            className="ml-2 border rounded-md px-2 py-1 text-black bg-gray-700"
            placeholder="Enter new year"
          />
          <button
            onClick={handleUpdate}
            disabled={updateLoading}
            className={` mt-2 ml-2 px-4 py-2 text-white bg-blue-500 rounded-md ${updateLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
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
        className={`ml-2 mt-2 px-4 py-2 text-white bg-red-500 rounded-md ${deleteLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"}`}
      >
        {deleteLoading ? "Deleting..." : "Delete Album"}
      </button>
      {deleteError && <p className="mt-2 text-sm text-red-500">{deleteError}</p>}
      {updateError && <p className="mt-2 text-sm text-red-500">{updateError}</p>}
    </div>
  );
};

export default AlbumCard;
