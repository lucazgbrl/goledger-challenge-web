import { deleteSong } from "@/api/song";
import useDelete from "@/hooks/useDelete";

const useDeleteSong = () => {
  const { deleteEntity, loading, error, success } = useDelete(
    async (songData: Record<string, unknown>) => {
      await deleteSong({ ...songData });
    },
    "song"
  );

  return { deleteSongHandler: deleteEntity, loading, error, success };
};

export default useDeleteSong;
