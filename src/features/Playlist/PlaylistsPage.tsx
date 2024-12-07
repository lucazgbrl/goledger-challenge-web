import PlaylistList from "@/components/Playlist/PlaylistList";
import { PlaylistResponse } from "@/types/playlist";

interface Props {
  playlists: PlaylistResponse[];
}

const PlaylistsPage = ({ playlists }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500">Playlists</h1>
        <p className="mt-2 text-lg text-gray-600">Explore all playlists.</p>
      </header>

      <main>
        <PlaylistList playlists={playlists} />
      </main>
    </div>
  );
};

export default PlaylistsPage;