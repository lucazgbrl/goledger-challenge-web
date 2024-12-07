// pages/artists.tsx
import ArtistList from '@/components/Artist/ArtistList';
import { ArtistsReponse } from '@/types/artist';

interface Props {
  artists: ArtistsReponse[];
}

const ArtistsPage = ({ artists }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500">Artists</h1>
        <p className="mt-2 text-lg text-gray-600">Explore all artists.</p>
      </header>

      <main>
        <ArtistList artists={artists} />
      </main>
    </div>
  );
};

export default ArtistsPage;
