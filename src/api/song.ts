import { fetchAssetData } from "./api";
import { createAsset } from "./api";

export const getSongs = async () => fetchAssetData("song");

export const createSong = async (data: object) => createAsset("song", data);
