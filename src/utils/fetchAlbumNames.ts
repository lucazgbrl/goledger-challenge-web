// src/utils/fetchAlbumNames.ts
import { queryAlbumByKey } from "@/api/album";

export const fetchAlbumNames = async (
  albumKeys: string[]
): Promise<Record<string, string>> => {
  const albumPromises = albumKeys.map((key) => queryAlbumByKey(key));
  const albumDataArray = await Promise.all(albumPromises);

  // Creating a map with album keys and their corresponding names
  const albumNameMap: Record<string, string> = {};
  albumDataArray.forEach((albumData) => {
    if (albumData.result.length > 0) {
      const albumKey = albumData.result[0]["@key"];
      const albumName = albumData.result[0].name;
      albumNameMap[albumKey] = albumName;
    }
  });

  return albumNameMap;
};
