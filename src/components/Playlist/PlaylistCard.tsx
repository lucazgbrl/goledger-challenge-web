import { Playlist } from "@/types/playlist";
import { useState } from "react";
import useDeletePlaylist from "@/hooks/playlist/useDeletePlatlist";
import { useUpdatePlaylist } from "@/hooks/playlist/useUpdatePlaylist";
import { toast } from "react-toastify";

interface PlaylistCardProps {
  playlist: Playlist;
  onDelete: (deletedPlaylist: string) => void;
  onUpdate: (updatedPlaylist: Playlist) => void;
}

const PlaylistCard = ({ playlist, onDelete, onUpdate }: PlaylistCardProps) => {
  const [showSongs, setShowSongs] = useState(false);
  const { deletePlaylist, loading: deleteLoading, error: deleteError } = useDeletePlaylist();
  const { updatePlaylist, error: updateError } = useUpdatePlaylist();

  const handleDelete = async (playlistName: string) => {
    try {
      await deletePlaylist(playlistName);
      onDelete(playlistName);
      toast.success(`Playlist: ${playlistName} deleted successfully`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error deleting playlist: ${deleteError || error.message}`);
      }
    }
  };

  const handleUpdate = async (updatedPlaylist: Playlist) => {
    try {
      await updatePlaylist(updatedPlaylist);
      toast.success(`Playlist: ${updatedPlaylist.name} updated successfully`);
      onUpdate(updatedPlaylist);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error deleting playlist: ${updateError || error.message}`);
      }
    }
  };

  const removeSongFromPlaylist = (songName: string) => {
    const updatedPlaylist = {
      ...playlist,
      songs: playlist.songs.filter((song) => song.name !== songName),
    };
    handleUpdate(updatedPlaylist);
  };

  const toggleShowSongs = () => {
    setShowSongs((prev) => !prev);
  };

  return (
    <div className="relative bg-gradient-to-r from-gray-800 to-black rounded-lg shadow-xl p-6 max-w-sm mx-auto mb-4 hover:scale-105 transition duration-300">
      <div className="relative z-10 flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white text-shadow-md mr-2">{playlist.name}</h3>
        <div className="flex space-x-3">
          <button
            onClick={toggleShowSongs}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition duration-300"
          >
            {showSongs ? "Hide Songs" : "Show Songs"}
          </button>
          <button
            onClick={() => handleDelete(playlist.name)}
            disabled={deleteLoading}
            className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition duration-300 ${deleteLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {showSongs && (
        <div className="mt-4 space-y-2">
          {playlist.songs.map((song, idx) => (
            <div key={idx} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
              <span className="text-white">{song.name}</span>
              <button
                onClick={() => removeSongFromPlaylist(song.name)}
                className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistCard;
