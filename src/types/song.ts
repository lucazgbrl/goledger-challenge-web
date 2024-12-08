export interface SongResponse {
  "@key": string;
  name: string;
  album: {
    "@assetType": string;
    "@key": string;
  };
}

export interface SongWithAlbumName {
  "@key": string;
  name: string;
  albumName: string;
  album: {
    "@assetType": string;
    "@key": string;
  };
}
