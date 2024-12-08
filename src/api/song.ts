import { fetchAssetData } from "./api";
import { searchResponse } from "../types";
import { createAsset } from "./api";

export const getSongs = async (): Promise<searchResponse> =>
  fetchAssetData("song");

export const createSong = async (data: object) => createAsset("song", data);
