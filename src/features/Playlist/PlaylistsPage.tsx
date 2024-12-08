import PlaylistList from "@/components/Playlist/PlaylistList";
import { Playlist } from "@/types/playlist";

interface Props {
  playlists: Playlist[];
}

const PlaylistsPage: React.FC<Props> = ({ playlists }) => {
  return (
    <div>
      <h1>Playlists</h1>
      <PlaylistList playlists={playlists} />
    </div>
  );
};

export default PlaylistsPage;