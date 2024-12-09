import SongCard from "./SongCard";
import { SongWithAlbumName } from "@/types/song";
import useFetchSongs from "@/hooks/song/useFetchSongs";
import { useEffect, useState } from "react";

const SongList = () => {
  const [songs, setSongs] = useState<SongWithAlbumName[]>([]);
  const { songs: fetchedSongs } = useFetchSongs();

  useEffect(() => {
    setSongs(fetchedSongs);
  }, [fetchedSongs]);

  const handleDeleteSong = (songData: Record<string, unknown>) => {
    setSongs((prev) =>
      prev.filter(
        (song) =>
          song.name !== songData.name || song.album !== songData.album
      )
    );
  };

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
