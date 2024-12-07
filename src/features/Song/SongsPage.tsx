import SongList from "@/components/Song/SongList";
import { SongResponse } from "@/types/song";

interface Props {
  songs: SongResponse[];
}

const SongsPage = ({ songs }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500">Songs</h1>
        <p className="mt-2 text-lg text-gray-600">Explore all songs.</p>
      </header>

      <main>
        <SongList songs={songs} />
      </main>
    </div>
  );
};

export default SongsPage;