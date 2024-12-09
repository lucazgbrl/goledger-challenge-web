export interface AlbumResponse {
  "@key"?: string;
  name: string;
  year?: number | string;
  artist: {
    "@assetType": "artist";
    "@key": string;
  };
}
