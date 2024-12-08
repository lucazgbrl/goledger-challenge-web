import { fetchAssetData, createAsset, deleteAsset } from "./api";
import { PlaylistResponse } from "@/types/playlist";

export const getPlaylists = async () =>
  fetchAssetData<PlaylistResponse>("playlist");

export const createPlaylist = async (data: object) =>
  createAsset("playlist", data);

export const deletePlaylist = async (name: string) =>
  deleteAsset(
    "playlist",
    {
      name,
    },
    true
  );
