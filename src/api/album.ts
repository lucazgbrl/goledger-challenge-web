import { fetchAssetData, queryAssetByKey } from "./api";
import { createAsset } from "./api";

export const getAlbums = async () => fetchAssetData("album");

export const createAlbum = async (data: object) => createAsset("album", data);

export const queryAlbumByKey = async (key: string) =>
  queryAssetByKey("album", key);