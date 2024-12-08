import useUpdate from "../useUpdate";
import { updateArtist } from "@/api/artist";

export const useUpdateArtist = () => {
  const { updateEntity, loading, error, success } = useUpdate(updateArtist);

  return { updateArtist: updateEntity, loading, error, success };
};
