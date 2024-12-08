interface SongInPlaylist {
  "@assetType": string;
  "@key": string;
}

export interface PlaylistResponse {
  "@key": string;
  name: string;
  songs: SongInPlaylist[];
}

export interface Playlist {
  name: string;
  songs: {
    name: string;
    album: string;
  }[];
}
