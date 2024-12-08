import { Playlist } from "@/types/playlist";
import useDeletePlaylist from "@/hooks/playlist/useDeletePlatlist";

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const { deletePlaylist, loading, error } = useDeletePlaylist();

  const handleDelete = async (playlist: string) => {
    await deletePlaylist(playlist);
  }
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">{playlist.name}</h3>
        {(playlist.songs.length > 0) && (
          playlist.songs.map((song, idx) => {
            return (
              <div key={idx}>
                <p>Song: {song.name}</p>
                <p>Album: {song.album}</p>
              </div>
          )}
        ))}
        <button
          className="text-red-500"
          onClick={() => handleDelete(playlist.name)}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
};

export default PlaylistCard;

