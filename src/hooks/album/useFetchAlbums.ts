import useFetch from "@/hooks/useFetch";
import { getAlbums } from "@/api/album";
import { AlbumResponse } from "@/types/album";

const useFetchAlbums = () => {
  const { data: albums, loading, error } = useFetch<AlbumResponse>(getAlbums);

  return { albums, loading, error };
};

export default useFetchAlbums;
