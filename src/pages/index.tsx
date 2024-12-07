import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500">Bem-vindo ao App de Streaming!</h1>
        <p className="mt-2 text-lg text-gray-600">Explore artistas, álbuns e playlists.</p>
      </header>

      <main>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-800">Artistas</h2>
            <p className="mt-2 text-gray-600">Descubra novos artistas e suas músicas.</p>
            <Link legacyBehavior href="/artistas">
              <a className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Ver Artistas
              </a>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-800">Álbuns</h2>
            <p className="mt-2 text-gray-600">Explore os álbuns mais populares.</p>
            <Link legacyBehavior href="/albuns">
              <a className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Ver Álbuns
              </a>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-800">Playlists</h2>
            <p className="mt-2 text-gray-600">Encontre playlists personalizadas para todos os gostos.</p>
            <Link legacyBehavior href="/playlists">
              <a className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Ver Playlists
              </a>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
