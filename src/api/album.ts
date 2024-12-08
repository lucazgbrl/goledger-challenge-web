import {
  fetchAssetData,
  queryAssetByKey,
  queryAssetByName,
  deleteAsset,
} from "./api";
import { createAsset } from "./api";

export const getAlbums = async () => fetchAssetData("album");

export const createAlbum = async (data: object) => createAsset("album", data);

export const queryAlbumByKey = async (key: string) =>
  queryAssetByKey("album", key);

export const queryAlbumByName = async (name: string) =>
  queryAssetByName("album", name);

export const removeAlbum = async (albumData: Record<string, unknown>) =>
  deleteAsset("album", albumData, true);
