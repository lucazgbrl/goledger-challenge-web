import { PlaylistResponse } from "@/types/playlist";
import PlaylistCard from "./PlaylistCard";

interface PlaylistListProps {
  playlists: PlaylistResponse[];
}

const PlaylistList = ({ playlists }: PlaylistListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.tag} playlist={playlist} />
      ))}
    </div>
  );
};

export default PlaylistList;