import SongCard from "./SongCard";
import { SongWithAlbumName } from "@/types/song";

interface SongListProps {
  songs: SongWithAlbumName[];
}

const SongList = ({ songs }: SongListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {songs.map((song) => (
        <SongCard key ={song["@key"]} song={song} />
      ))}
    </div>
  );
};

export default SongList;
