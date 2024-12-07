interface PlaylistProps {
  description: string;
  label: string;
}

export interface PlaylistResponse {
  label: string;
  props: PlaylistProps[];
  tag: string;
}
