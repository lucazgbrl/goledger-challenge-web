import { fetchAssetData } from "@/api/api";
import useFetch from "@/hooks/useFetch";
import { ArtistsReponse } from "@/types/artist";

const useFetchArtists = () => {
  const {
    data: artists,
    loading,
    error,
  } = useFetch<ArtistsReponse>(
    () => fetchAssetData("artist"),
    (data) => data.result
  );

  return { artists, loading, error };
};

export default useFetchArtists;
