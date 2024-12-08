import { fetchAssetData, createAsset, readAssetByName } from "./api";

export const getArtists = async () => fetchAssetData("artist");

export const createArtist = async (data: object) => createAsset("artist", data);

export const readArtistByName = async (name: string) =>
  readAssetByName("artist", name);
