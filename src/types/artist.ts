interface ArtistProps {
  description: string;
  label: string;
}

export interface ArtistsReponse {
  label: string;
  props: ArtistProps[];
  tag: string;
}
