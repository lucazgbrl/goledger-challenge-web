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
    <div className="flex justify-between items-center">
    <span>{ song.name }</span>
    <span>{ song.albumName }</span>
    <button
      onClick={() => handleDelete({ name: song.name, album: song.album })}
      disabled={loading}
      className={`px-4 py-2 bg-red-500 text-white rounded ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      Delete
    </button>
  </div>
)};

export default SongCard;