import axios, { AxiosInstance } from "axios";
import { searchResponse } from "../types";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "*/*",
    Authorization: `Basic ${process.env.NEXT_PUBLIC_API_TOKEN}==`,
    "Content-Type": "application/json",
  },
});

// A reusable function to fetch data based on asset type
const fetchAssetData = async (assetType: string): Promise<searchResponse> => {
  const response = await api.post<searchResponse>("/api/query/search", {
    query: {
      selector: {
        assetType,
      },
    },
  });
  return response.data;
};

// Fetch artists, albums, and playlists
export const getArtists = async (): Promise<searchResponse> =>
  fetchAssetData("artist");
export const getAlbums = async (): Promise<searchResponse> =>
  fetchAssetData("album");
export const getPlaylists = async (): Promise<searchResponse> =>
  fetchAssetData("playlist");

export default api;
