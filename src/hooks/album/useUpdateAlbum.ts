import useUpdate from "../useUpdate";
import { updateAlbum } from "@/api/album";

export const useUpdateAlbum = () => {
  const { updateEntity, loading, error, success } = useUpdate(updateAlbum);

  return { updateAlbum: updateEntity, loading, error, success };
};
