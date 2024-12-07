interface SongProps {
  description: string;
  label: string;
}

export interface SongResponse {
  label: string;
  props: SongProps[];
  tag: string;
}
