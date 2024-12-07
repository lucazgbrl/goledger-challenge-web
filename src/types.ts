// Interface to describe each prop (field) of an artist
interface ArtistProps {
  description: string;
  label: string;
}

// Interface to describe the response structure for an asset type (e.g., artist)
export interface ArtistsReponse {
  label: string;
  props: ArtistProps[];
  tag: string;
}
