import { removeAlbum } from "@/api/album";
import useDelete from "@/hooks/useDelete";

export const useDeleteAlbum = () => {
  const { deleteEntity, loading, error, success } = useDelete(
    async (albumData: { name: string; artist: { "@key": string } }) => {
      await removeAlbum({
        name: albumData.name,
        artist: {
          "@assetType": "artist",
          "@key": albumData.artist["@key"],
        },
      });
    },
    "album"
  );

  return { deleteAlbum: deleteEntity, loading, error, success };
};
