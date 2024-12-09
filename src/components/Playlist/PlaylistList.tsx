import { Playlist } from "@/types/playlist";
import PlaylistCard from "./PlaylistCard";

interface Props {
  playlists: Playlist[];
  onDelete: (deletedPlaylist: string) => void;
  onUpdate: (updatedPlaylist: Playlist) => void;
}

const PlaylistList = ({ playlists, onDelete: handleDelete, onUpdate: handleUpdate }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {playlists.map((playlist, idx) => (
        <PlaylistCard key={idx} playlist={playlist} onDelete={handleDelete} onUpdate={handleUpdate} />
      ))}
    </div>
  );
};

export default PlaylistList;
