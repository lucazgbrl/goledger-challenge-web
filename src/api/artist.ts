import {
  fetchAssetData,
  createAsset,
  readAssetByName,
  deleteAsset,
} from "./api";
import { ArtistsReponse } from "@/types/artist";

export const getArtists = async () => fetchAssetData<ArtistsReponse>("artist");

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
