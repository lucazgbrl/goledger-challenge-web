import {
  fetchAssetData,
  createAsset,
  readAssetByName,
  deleteAsset,
  updateAsset,
} from "./api";
import { ArtistsResponse } from "@/types/artist";

export const getArtists = async () => fetchAssetData<ArtistsResponse>("artist");

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

export const updateArtist = async (data: object) =>
  updateAsset({ update: { "@assetType": "artist", ...data } });
