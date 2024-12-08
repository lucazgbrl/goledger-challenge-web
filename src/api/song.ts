import { fetchAssetData, createAsset, queryAssetByKey } from "./api";

export const getSongs = async () => fetchAssetData("song");

export const createSong = async (data: object) => createAsset("song", data);

export const getSongByKey = async (key: string) => queryAssetByKey("song", key);
