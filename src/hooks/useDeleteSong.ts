import { useState } from "react";
import { deleteSong } from "@/api/song";

const useDeleteSong = () => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteSongHandler = async (songData: Record<string, unknown>) => {
    setIsDeleting(true);

    try {
      await deleteSong({ ...songData });
      alert("Song deleted successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        alert(`Failed to delete song: ${error.message}`);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteSongHandler, isDeleting, error };
};

export default useDeleteSong;
