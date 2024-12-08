import { Playlist } from "@/types/playlist";
import PlaylistCard from "./PlaylistCard";

interface PlaylistListProps {
  playlists: Playlist[];
}

const PlaylistList = ({ playlists }: PlaylistListProps) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {playlists.map((playlist, idx) => (
      <PlaylistCard key={idx} playlist={playlist} />
    ))}
  </div>
);

export default PlaylistList;