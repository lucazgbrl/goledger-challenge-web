export interface EveryAssetOfAType {
  result: [];
}

export interface FetchDataResponse<T> {
  result: T[];
}

export interface DeleteResponse {
  deletedKeys: string[];
}

export interface DeleteRequestBody {
  key: Record<string, unknown>;
  cascade: boolean;
}

export interface UpdatePayload {
  update: {
    "@assetType": string;
    [key: string]: unknown;
  };
}

export interface UpdateDataResponse {
  "@lastUpdated": string;
}
