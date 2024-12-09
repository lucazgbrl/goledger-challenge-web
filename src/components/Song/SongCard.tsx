import { SongResponse, SongWithAlbumName } from "@/types/song";
import useDeleteSong from "@/hooks/song/useDeleteSong";
import { toast } from "react-toastify";

interface SongCardProps {
  song: SongWithAlbumName | SongResponse;
  onDelete: (songData: Record<string, unknown>) => void;
}

const SongCard = ({ song, onDelete }: SongCardProps) => {
  const { deleteSongHandler, loading, error } = useDeleteSong();

  const handleDelete = async (songData: Record<string, unknown>) => {
    await deleteSongHandler({...songData});
    
    if(error) {
      toast.error(`Failed to delete song: ${error}`);
    } else {
      onDelete(songData);
      toast.success(`Song: ${songData.name} deleted successfully`);
    }
  };
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-black rounded-lg shadow-2xl p-6">
      <div className="flex flex-col">
        <span className="font-semibold text-xl text-white">{song.name}</span>
        { 'albumName' in song && <span className="text-sm text-gray-400">{song.albumName}</span> }
      </div>
      <button
        onClick={() => handleDelete({ name: song.name, album: song.album })}
        disabled={loading}
        className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
)};

export default SongCard;