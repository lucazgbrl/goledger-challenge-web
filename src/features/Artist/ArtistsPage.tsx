import ArtistForm from '@/components/Artist/ArtistForm';
import ArtistList from '@/components/Artist/ArtistList';
import { useEffect, useState } from 'react';
import useFetchArtists from '@/hooks/artist/useFetchArtits';
import { ArtistsResponse } from '@/types/artist';

const ArtistsPage = () => {
  const [artists, setArtists] = useState<ArtistsResponse[]>([]);
  const { artists: fetchedArtists } = useFetchArtists();
 
  useEffect(() => {
    setArtists(fetchedArtists);
  }, [fetchedArtists]);

  const handleAddArtist = (newArtist: ArtistsResponse) => {
    setArtists((prev) => [...prev, newArtist]);
  };

  const handleUpdateArtist = (updatedArtist: ArtistsResponse) => {
    setArtists((prev) =>
      prev.map((artist) =>
        artist.name === updatedArtist.name ? updatedArtist : artist
      )
    );
  };

  const handleDeleteArtist = (artistName: string) => {
    setArtists((prev) => prev.filter((artist) => artist.name !== artistName));
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <header className="mb-6 text-center bg-gray-800 p-4 rounded-lg">
        <h1 className="text-4xl font-bold text-white">Artists</h1>
        <p className="mt-2 text-lg text-gray-300">Explore and manage your favorite artists.</p>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        <ArtistForm onNewArtist={handleAddArtist} />
        <ArtistList artists={ artists } onDeleteArtist={ handleDeleteArtist } onUpdateArtist={ handleUpdateArtist }  />
      </main>
    </div>
  );
};


export default ArtistsPage;
