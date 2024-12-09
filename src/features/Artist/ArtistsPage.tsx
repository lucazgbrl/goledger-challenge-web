// pages/artists.tsx
import ArtistForm from '@/components/Artist/ArtistForm';
import ArtistList from '@/components/Artist/ArtistList';

const ArtistsPage = () => {
  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <header className="mb-6 text-center bg-gray-800 p-4 rounded-lg">
        <h1 className="text-4xl font-bold text-white">Artists</h1>
        <p className="mt-2 text-lg text-gray-300">Explore and manage your favorite artists.</p>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        <ArtistForm />
        <ArtistList />
      </main>
    </div>
  );
};


export default ArtistsPage;
