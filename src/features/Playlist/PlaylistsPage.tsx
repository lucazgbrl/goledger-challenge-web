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

      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-2xl p-6 max-w-md mx-auto mb-6 hover:scale-105 transition-transform duration-300">
        <button
          onClick={handleFormToggle}
          className="w-full px-6 py-3 bg-blue-600 text-white font-bold text-lg rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform duration-300 transform hover:scale-105"
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