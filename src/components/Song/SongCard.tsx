import { SongWithAlbumName } from "@/types/song";
import useDeleteSong from "@/hooks/song/useDeleteSong";

interface SongCardProps {
  song: SongWithAlbumName;
}

const SongCard = ({ song }: SongCardProps) => {
  const { deleteSongHandler, loading } = useDeleteSong();

  const handleDelete = async (songData: Record<string, unknown>) => {
    await deleteSongHandler({...songData});
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center space-x-4 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col">
        <span className="font-semibold text-xl text-gray-800">{song.name}</span>
        <span className="text-sm text-gray-600">{song.albumName}</span>
      </div>
      <button
        onClick={() => handleDelete({ name: song.name, album: song.album })}
        disabled={loading}
        className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
)};

export default SongCard;