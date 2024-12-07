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
export const fetchAssetData = async (
  assetType: string
): Promise<searchResponse> => {
  const response = await api.post<searchResponse>("/query/search", {
    query: {
      selector: {
        assetType,
      },
    },
  });
  return response.data;
};

export default api;
