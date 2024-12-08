import useUpdate from "../useUpdate";
import { updatePlaylist } from "@/api/playlist";

export const useUpdatePlaylist = () => {
  const { updateEntity, loading, error, success } = useUpdate(updatePlaylist);

  return { updatePlaylist: updateEntity, loading, error, success };
};
