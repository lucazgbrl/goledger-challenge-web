interface ArtistProps {
  description: string;
  label: string;
}

export interface ArtistsReponse {
  label: string;
  props: ArtistProps[];
  tag: string;
}

interface AlbumProps {
  description: string;
  label: string;
}

export interface AlbumResponse {
  label: string;
  props: AlbumProps[];
  tag: string;
}

export interface searchResponse {
  result: [];
}
