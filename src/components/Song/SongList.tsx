import SongCard from "./SongCard";
import { SongResponse } from "@/types/song";

interface SongListProps {
  songs: SongResponse[];
}

const SongList = ({ songs }: SongListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {songs.map((song) => (
        <SongCard key={song.tag} song={song} />
      ))}
    </div>
  );
};

export default SongList;
