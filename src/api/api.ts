import axios, { AxiosInstance } from "axios";
import {
  FetchDataResponse,
  EveryAssetOfAType,
  UpdatePayload,
  DeleteRequestBody,
  UpdateDataResponse,
} from "../types/allAssets";
import { handleApiError } from "../utils/handleApiError";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "*/*",
    Authorization: `Basic ${process.env.NEXT_PUBLIC_API_TOKEN}==`,
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    handleApiError(error);
  }
);

// A generic function to fetch assets of any type
export const fetchAssetData = async <T>(
  assetType: string
): Promise<FetchDataResponse<T>> => {
  try {
    const response = await api.post<EveryAssetOfAType>("/query/search", {
      query: {
        selector: {
          "@assetType": assetType,
        },
      },
    });

    if (!response.data) {
      throw new Error("No data received from the server.");
    }

    // Assuming the data is of the type we expect for FetchDataResponse
    return response.data as FetchDataResponse<T>;
  } catch (error) {
    throw error;
  }
};

// Create a new asset of the specified type
export const createAsset = async (assetType: string, data: object) => {
  try {
    const response = await api.post("/invoke/createAsset", {
      asset: [
        {
          "@assetType": assetType,
          ...data,
        },
      ],
    });

    if (!response.data) {
      throw new Error("Asset creation failed. No data returned.");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Read a specific asset by name
export const readAssetByName = async (assetType: string, name: string) => {
  try {
    const response = await api.post("/query/readAsset", {
      key: {
        "@assetType": assetType,
        name,
      },
    });

    if (!response.data) {
      throw new Error(`No data found for asset: ${name}`);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// search for an asset by key
export const queryAssetByKey = async (assetType: string, key: string) => {
  try {
    const response = await api.post("/query/search", {
      query: {
        selector: {
          "@assetType": assetType,
          "@key": key,
        },
      },
    });

    if (!response.data) {
      throw new Error("No data found for the specified key.");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// search for an asset by name
export const queryAssetByName = async (assetType: string, name: string) => {
  try {
    const response = await api.post("/query/search", {
      query: {
        selector: {
          "@assetType": assetType,
          name,
        },
      },
    });

    if (!response.data) {
      throw new Error(`No data found for asset: ${name}`);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete asset with it's data as payload
export const deleteAsset = async (
  assetType: string,
  keyData: Record<string, unknown>,
  cascade: boolean = false
) => {
  const requestBody: DeleteRequestBody = {
    key: { "@assetType": assetType, ...keyData },
    cascade,
  };

  try {
    const response = await api.post("/invoke/deleteAsset", requestBody);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAsset = async (payload: UpdatePayload) => {
  try {
    const response = await api.post("/invoke/updateAsset", payload);

    if (!response.data) {
      throw new Error("No response data received.");
    }

    return {
      success: true,
      message: "Asset updated successfully.",
      updatedAsset: response.data as UpdateDataResponse,
    };
  } catch (error) {
    throw error;
  }
};

export default api;
