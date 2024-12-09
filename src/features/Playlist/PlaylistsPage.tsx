import PlaylistForm from "@/components/Playlist/PlaylistForm";
import PlaylistList from "@/components/Playlist/PlaylistList";
import useFetchPlaylists from "@/hooks/playlist/useFetchPlaylists";
import { Playlist, PlaylistResponse } from "@/types/playlist";
import { useState, useEffect } from "react";


const PlaylistsPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { playlists: fetchedPlaylists } = useFetchPlaylists();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    setPlaylists(fetchedPlaylists);
  }, [fetchedPlaylists]);


  const handleDelete = (deletedPlaylist: string) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.filter((playlist) => playlist.name !== deletedPlaylist)
    );
  };

  const handleUpdate = (updatedPlaylist: Playlist | PlaylistResponse) => {
    if ("@key" in updatedPlaylist) {
      const remappedPlaylist: Playlist = {
        name: updatedPlaylist.name,
        songs: updatedPlaylist.songs.map((song) => ({
          name: song["@key"],
          album: "Unknown Album",
        })),
      };
      setPlaylists((prevPlaylists) => [...prevPlaylists, remappedPlaylist]);
    } else {
      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((playlist) =>
          playlist.name === updatedPlaylist.name ? updatedPlaylist : playlist
        )
      );
    }
  };

  const handleFormToggle = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <header className="mb-6 text-center bg-gray-800 p-4 rounded-lg">
        <h1 className="text-4xl font-bold text-white">Playlists</h1>
      </header>

      <div className="flex justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-2xl p-6 mx-auto mb-6 hover:scale-105 transition-transform duration-300">
        <button
          onClick={handleFormToggle}
          className="px-6 py-3 bg-blue-600 text-white font-bold text-lg rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform duration-300 transform hover:scale-105"
        >
          New Playlist
        </button>
      </div>

      {isFormVisible && (
        <div className="mt-6">
          <PlaylistForm onClose={handleFormToggle} onNewPlaylist={ handleUpdate } />
        </div>
      )}

      <PlaylistList playlists={playlists} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default PlaylistsPage;