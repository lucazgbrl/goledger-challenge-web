import SongForm from "@/components/Song/SongForm";
import SongList from "@/components/Song/SongList";
import { SongWithAlbumName } from "@/types/song";

interface Props {
  songs: SongWithAlbumName[];
}

const SongsPage = ({ songs }: Props) => {

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-400">Songs</h1>
        <p className="mt-2 text-lg text-gray-400">Explore all songs.</p>
      </header>

      <main>
        <SongForm />
        <SongList songs={songs} />
      </main>
    </div>
  );
};

export default SongsPage;