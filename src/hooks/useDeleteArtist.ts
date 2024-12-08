import { useState } from "react";
import { deleteArtist } from "@/api/artist";
import { DeleteResponse } from "@/types/allAssets";

export default function useDeleteArtist() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteArtistHandler = async (name: string): Promise<DeleteResponse> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await deleteArtist(name);
      if (response.deletedKeys.length > 0) {
        setSuccess(true);
        alert(`Successfully deleted artist: ${name}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
      alert(`Failed to delete artist: ${error}`);
    } finally {
      setLoading(false);
    }

    return { deletedKeys: success ? [name] : [] };
  };

  return { deleteArtist: deleteArtistHandler, loading, error, success };
}
