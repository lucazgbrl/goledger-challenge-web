export interface AlbumResponse {
  "@key"?: string;
  name: string;
  year?: number;
  artist: {
    "@assetType": "artist";
    "@key": string;
  };
}
