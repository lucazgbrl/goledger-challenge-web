import {
  fetchAssetData,
  createAsset,
  readAssetByName,
  deleteAsset,
} from "./api";

export const getArtists = async () => fetchAssetData("artist");

export const createArtist = async (data: object) => createAsset("artist", data);

export const readArtistByName = async (name: string) =>
  readAssetByName("artist", name);

export const deleteArtist = async (name: string) =>
  deleteAsset(
    "artist",
    {
      name,
    },
    true
  );
