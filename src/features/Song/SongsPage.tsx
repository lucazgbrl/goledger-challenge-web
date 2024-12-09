import SongForm from "@/components/Song/SongForm";
import SongList from "@/components/Song/SongList";
import { SongWithAlbumName } from "@/types/song";
import useFetchSongs from "@/hooks/song/useFetchSongs";
import { useEffect, useState } from "react";

const SongsPage = () => {
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

  const handleAddSong = (newSong: SongWithAlbumName) => {
    setSongs((prev) => [...prev, newSong]);
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-400">Songs</h1>
        <p className="mt-2 text-lg text-gray-400">Explore all songs.</p>
      </header>

      <main>
        <SongForm onNewSong={ handleAddSong }/>
        <SongList onDelete={ handleDeleteSong } songs={ songs } />
      </main>
    </div>
  );
};

export default SongsPage;