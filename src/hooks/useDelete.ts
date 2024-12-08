import { useState } from "react";
import { DeleteResponse } from "@/types/allAssets";

export default function useDelete<T>(
  deleteFn: (data: T) => Promise<void>,
  entityType: string
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteHandler = async (data: T): Promise<DeleteResponse> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await deleteFn(data);
      setSuccess(true);
      alert(`Successfully deleted ${entityType}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      alert(`Failed to delete ${entityType}: ${error}`);
    } finally {
      setLoading(false);
    }

    return { deletedKeys: success ? [entityType] : [] };
  };

  return { deleteEntity: deleteHandler, loading, error, success };
}
