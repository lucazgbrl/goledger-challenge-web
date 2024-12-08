import { deleteArtist } from "@/api/artist";
import useDelete from "@/hooks/useDelete";
export default function useDeleteArtist() {
  const { deleteEntity, loading, error, success } = useDelete(
    deleteArtist,
    "artist"
  );

  return { deleteArtist: deleteEntity, loading, error, success };
}
