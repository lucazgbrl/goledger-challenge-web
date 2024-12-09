import { fetchAssetData } from "@/api/api";
import useFetch from "@/hooks/useFetch";
import { ArtistsResponse } from "@/types/artist";

const useFetchArtists = () => {
  const {
    data: artists,
    loading,
    error,
  } = useFetch<ArtistsResponse>(
    () => fetchAssetData("artist"),
    (data) => data.result
  );

  return { artists, loading, error };
};

export default useFetchArtists;
