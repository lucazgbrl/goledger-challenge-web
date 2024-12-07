import { fetchAssetData } from "./api";
import { searchResponse } from "../types";

export const getArtists = async (): Promise<searchResponse> =>
  fetchAssetData("artist");
