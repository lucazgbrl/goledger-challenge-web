import { useState, useEffect } from 'react';
import { getAlbums } from '@/services/api';
import { AlbumResponse } from '@/types';

const AlbumsPage = () => {
  const [albums, setAlbums] = useState<AlbumResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const { result } = await getAlbums();
        setAlbums(result);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500">Albums</h1>
        <p className="mt-2 text-lg text-gray-600">Explore all albums.</p>
      </header>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {albums?.map((album) => (
            <div key={album.label} className="bg-white p-6 rounded-lg shadow-md text-center">
              {album.props.map((prop, index) => (
                <div key={index}>
                  <h2 className="text-xl font-semibold text-gray-800">{prop.label}</h2>
                  <p className="text-gray-600">{prop.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AlbumsPage;
