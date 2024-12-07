import { fetchAssetData } from "./api";
import { searchResponse } from "../types";

export const getSongs = async (): Promise<searchResponse> =>
  fetchAssetData("song");
