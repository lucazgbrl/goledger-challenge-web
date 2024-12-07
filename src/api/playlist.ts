import { fetchAssetData } from "./api";
import { searchResponse } from "../types";

export const getPlaylists = async (): Promise<searchResponse> =>
  fetchAssetData("playlist");
