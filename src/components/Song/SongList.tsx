import SongCard from "./SongCard";
import LoadingMessage from "../loadingMessage";
import { SongResponse, SongWithAlbumName } from "@/types/song";

interface Props {
  songs: SongWithAlbumName[] | SongResponse[];
  onDelete: (songData: Record<string, unknown>) => void;
}

const SongList = ({songs, onDelete: handleDeleteSong }: Props) => {
  if (songs.length === 0) {
    return <LoadingMessage pageName="songs" />;
  }

  return (
    <ul className="space-y-4">
      {songs.map((song) => (
        <li key={song["@key"]}>
          <SongCard song={song} onDelete={ handleDeleteSong } />
        </li>
      ))}
    </ul>
  );
};

export default SongList;
