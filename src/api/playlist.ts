import { fetchAssetData } from "./api";
import { searchResponse } from "../types";
import { createAsset } from "./api";

export const getPlaylists = async (): Promise<searchResponse> =>
  fetchAssetData("playlist");

export const createPlaylist = async (data: object) =>
  createAsset("playlist", data);
