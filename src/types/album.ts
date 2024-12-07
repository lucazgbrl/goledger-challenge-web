interface AlbumProps {
  description: string;
  label: string;
}

export interface AlbumResponse {
  label: string;
  props: AlbumProps[];
  tag: string;
}
