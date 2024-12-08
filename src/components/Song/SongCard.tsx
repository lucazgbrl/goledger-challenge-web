import { SongWithAlbumName } from "@/types/song";

interface SongCardProps {
  song: SongWithAlbumName;
  onDelete: (songData: Record<string, unknown>) => void;
  isDeleting: boolean;
}

const SongCard = ({ song, onDelete, isDeleting }: SongCardProps) => ((
    <div className="flex justify-between items-center">
    <span>{ song.name }</span>
    <span>{ song.albumName }</span>
    <button
      onClick={() => onDelete({ name: song.name, album: song.album })}
      disabled={isDeleting}
      className={`px-4 py-2 bg-red-500 text-white rounded ${
        isDeleting ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      Delete
    </button>
  </div>
  )
);

export default SongCard;