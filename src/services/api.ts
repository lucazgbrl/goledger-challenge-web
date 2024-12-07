import axios, { AxiosInstance } from "axios";
import { ArtistsReponse } from "../types";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "*/*",
    Authorization: `Basic ${process.env.NEXT_PUBLIC_API_TOKEN}==`,
    "Content-Type": "application/json",
  },
});

export const getSchema = async (): Promise<unknown> => {
  console.log(process.env.API_TOKEN);
  const response = await api.get<unknown>("/api/query/getSchema");
  return response.data;
};

export const getArtists = async (): Promise<ArtistsReponse[]> => {
  const response = await api.post<ArtistsReponse>("/api/query/getSchema", {
    assetType: "artist",
  });
  return [response.data];
};

export const getAlbums = async (): Promise<any[]> => {
  const response = await api.get("/api/query/getAlbums");
  return response.data.albums;
};

export const getPlaylists = async (): Promise<any[]> => {
  const response = await api.get("/api/query/getPlaylists");
  return response.data.playlists;
};

export default api;
