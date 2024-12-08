import { deletePlaylist } from "@/api/playlist";
import useDelete from "@/hooks/useDelete";

export default function useDeletePlaylist() {
  const { deleteEntity, loading, error, success } = useDelete(
    deletePlaylist,
    "playlist"
  );

  return { deletePlaylist: deleteEntity, loading, error, success };
}
