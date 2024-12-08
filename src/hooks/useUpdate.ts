import { useState, useCallback } from "react";
import { UpdateDataResponse } from "@/types/allAssets";

interface UpdateResponse {
  success: boolean;
  message: string;
  updatedAsset: UpdateDataResponse;
}

const useUpdate = (updateData: (data: object) => Promise<UpdateResponse>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const memoizedUpdateData = useCallback(updateData, []);

  const updateEntity = async (data: object) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await memoizedUpdateData(data);
      setSuccess(true);
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return { updateEntity, loading, error, success };
};

export default useUpdate;
