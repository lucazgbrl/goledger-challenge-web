import { fetchAssetData } from "./api";
import { createAsset } from "./api";

export const getPlaylists = async () => fetchAssetData("playlist");

export const createPlaylist = async (data: object) =>
  createAsset("playlist", data);
