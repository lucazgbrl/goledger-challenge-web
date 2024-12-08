import { Playlist } from "@/types/playlist";
import { useState } from "react";
import useDeletePlaylist from "@/hooks/playlist/useDeletePlatlist";

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const [showSongs, setShowSongs] = useState(false);
  const { deletePlaylist, loading, error } = useDeletePlaylist();

  const handleDelete = async (playlist: string) => {
    await deletePlaylist(playlist);
  }

  const toggleShowSongs = () => {
    setShowSongs((prev) => !prev);
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-black rounded-lg shadow-2xl p-6 max-w-sm mx-auto mb-4 hover:scale-105 transition duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-white">{playlist.name}</h3>
        <button
          onClick={toggleShowSongs}
          className="text-blue-500 hover:text-blue-400 text-sm font-medium ml-2"
        >
          {showSongs ? "Hide Playlist" : "Show Playlist"}
        </button>
      </div>
  
      {showSongs && playlist.songs.length > 0 && (
        <div className="flex flex-col space-y-2 text-sm text-gray-300">
          {playlist.songs.map((song, idx) => (
            <div key={idx} className="border-b border-gray-700 py-2">
              <p><span className="font-semibold text-blue-400">Song:</span> {song.name}</p>
              <p><span className="font-semibold text-blue-400">Album:</span> {song.album}</p>
            </div>
          ))}
        </div>
      )}
  
      <button
        className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
        onClick={() => handleDelete(playlist.name)}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Playlist"}
      </button>
  
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PlaylistCard;
