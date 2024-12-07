import { useState, useEffect } from 'react';
import { getArtists } from '@/services/api';
import { ArtistsReponse } from '@/types';

const ArtistsPage = () => {
  const [artists, setArtists] = useState<ArtistsReponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getArtists();
        setArtists(data); // Assumes data is an array of artists
        console.log(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500">Artists</h1>
        <p className="mt-2 text-lg text-gray-600">Explore all artists.</p>
      </header>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {artists.map((artist, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold text-gray-800">{artist.label}</h2>
              {artist.props?.map((prop, idx) => (
                <p key={idx} className="text-sm text-gray-600">
                  {prop.label}: {prop.description}
                </p>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ArtistsPage;
