import useDocumentTitle from "@/hooks/useDocumentTite";

const HomePage = () => {
  useDocumentTitle("Home");

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to the Streaming App!</h1>
        <p className="mt-2 text-lg text-gray-300">Explore artists, albums, and playlists.</p>
      </header>

      <main className="space-y-8">
        {/* Featured Artists Section */}
        <section>
          <h2 className="text-2xl text-white font-bold mb-4">Featured Artists</h2>
          <div className="flex space-x-6 overflow-x-auto">
            {/* Replace with dynamic content */}
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <img src="artist-image.jpg" alt="Artist" className="w-full h-32 object-cover rounded-lg mb-2" />
              <h3 className="text-white text-lg">Artist Name</h3>
            </div>
          </div>
        </section>

        {/* Popular Playlists Section */}
        <section>
          <h2 className="text-2xl text-white font-bold mb-4">Popular Playlists</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Replace with dynamic content */}
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <img src="playlist-image.jpg" alt="Playlist" className="w-full h-32 object-cover rounded-lg mb-2" />
              <h3 className="text-white text-lg">Playlist Name</h3>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
            Explore More
          </button>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
