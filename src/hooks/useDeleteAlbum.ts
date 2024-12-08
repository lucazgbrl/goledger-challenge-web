import { useState } from "react";
import { removeAlbum } from "@/api/album";
import { DeleteResponse } from "@/types/allAssets";

export const useDeleteAlbum = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAlbum = async (
    albumData: Record<string, unknown>
  ): Promise<DeleteResponse> => {
    setLoading(true);
    setError(null);

    try {
      await removeAlbum({
        name: albumData.name as string,
        artist: {
          "@assetType": "artist",
          "@key": (albumData.artist as { "@key": string })["@key"],
        },
      });
    } catch (error) {
      console.error("Error deleting album:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the album."
      );
    } finally {
      setLoading(false);
    }

    return { deletedKeys: [""] };
  };

  return { deleteAlbum, loading, error };
};
