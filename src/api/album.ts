import {
  fetchAssetData,
  queryAssetByKey,
  queryAssetByName,
  deleteAsset,
  updateAsset,
} from "./api";
import { createAsset } from "./api";
import { AlbumResponse } from "@/types/album";
import { FetchDataResponse, UpdatePayload } from "@/types/allAssets";

export const getAlbums = async (): Promise<
  FetchDataResponse<AlbumResponse>
> => {
  return fetchAssetData<AlbumResponse>("album");
};

export const createAlbum = async (data: object) => createAsset("album", data);

export const queryAlbumByKey = async (key: string) =>
  queryAssetByKey("album", key);

export const queryAlbumByName = async (name: string) =>
  queryAssetByName("album", name);

export const removeAlbum = async (albumData: Record<string, unknown>) =>
  deleteAsset("album", albumData, true);

export const updateAlbum = async (data: object) => {
  return updateAsset({ update: { "@assetType": "album", ...data } });
};
