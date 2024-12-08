import SongCard from "./SongCard";
import { SongWithAlbumName } from "@/types/song";
import useDeleteSong from "@/hooks/useDeleteSong";

interface SongListProps {
  songs: SongWithAlbumName[];
}

const SongList = ({ songs }: SongListProps) => {
  const { deleteSongHandler, isDeleting } = useDeleteSong();

  const handleDelete = async (songData: Record<string, unknown>) => {
    await deleteSongHandler({...songData});
    window.location.reload();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {songs.map((song) => (
        <SongCard key ={song["@key"]} song={song} onDelete={ handleDelete } isDeleting={ isDeleting } />
      ))}
    </div>
  );
};

export default SongList;
