import { useState } from "react";
import PlaylistForm from "@/components/Playlist/PlaylistForm";
import PlaylistList from "@/components/Playlist/PlaylistList";
import { Playlist } from "@/types/playlist";

interface Props {
  playlists: Playlist[];
}

const PlaylistsPage: React.FC<Props> = ({ playlists }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleFormToggle = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <header className="mb-6 text-center bg-gray-800 p-4 rounded-lg">
        <h1 className="text-4xl font-bold text-white">Playlists</h1>
      </header>

      <div className="bg-gradient-to-r from-gray-800 to-black rounded-lg shadow-2xl p-6 max-w-sm mx-auto mb-4 hover:scale-105 transition duration-300">
        <button
          onClick={handleFormToggle}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          New Playlist
        </button>
      </div>

      {isFormVisible && (
        <div className="mt-6">
          <PlaylistForm onClose={handleFormToggle} />
        </div>
      )}

      <PlaylistList playlists={playlists} />
    </div>
  );
};

export default PlaylistsPage;