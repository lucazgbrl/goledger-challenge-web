import { fetchAssetData } from "./api";
import { searchResponse } from "../types";
import { createAsset } from "./api";

export const getAlbums = async (): Promise<searchResponse> =>
  fetchAssetData("album");

export const createAlbum = async (data: object) => createAsset("album", data);
