import {
  fetchAssetData,
  createAsset,
  queryAssetByKey,
  queryAssetByName,
  deleteAsset,
} from "./api";

export const getSongs = async () => fetchAssetData("song");

export const createSong = async (data: object) => createAsset("song", data);

export const getSongByKey = async (key: string) => queryAssetByKey("song", key);

export const searchSongsByName = async (name: string) =>
  queryAssetByName("song", name);

export const deleteSong = async (songData: Record<string, unknown>) =>
  deleteAsset("song", songData);
