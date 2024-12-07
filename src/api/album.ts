import { fetchAssetData } from "./api";
import { searchResponse } from "../types";

export const getAlbums = async (): Promise<searchResponse> =>
  fetchAssetData("album");
