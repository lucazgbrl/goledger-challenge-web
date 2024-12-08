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
    <div className="p-6">
      <button
        onClick={handleFormToggle}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
      >
        New Playlist
      </button>

      {isFormVisible && (
        <div className="mt-4">
          <PlaylistForm onClose={handleFormToggle} />
        </div>
      )}
      <PlaylistList playlists={ playlists } />
    </div>
  );
};

export default PlaylistsPage;