import { fetchAssetData, createAsset, readAssetByName } from "./api";
import { searchResponse } from "../types";

export const getArtists = async (): Promise<searchResponse> =>
  fetchAssetData("artist");

export const createArtist = async (data: object) => createAsset("artist", data);

export const readArtistByName = async (name: string) =>
  readAssetByName("artist", name);
