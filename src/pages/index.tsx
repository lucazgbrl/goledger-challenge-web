import Card from "@/components/Card";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500">Welcome to the Streaming App!</h1>
        <p className="mt-2 text-lg text-gray-600">Explore artists, albums, and playlists.</p>
      </header>

      <main>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Card
            title="Artists"
            description="Discover new artists and their music."
            href="/ArtistsPage"
          />
          <Card
            title="Albums"
            description="Explore the most popular albums."
            href="/AlbumsPage"
          />
          <Card
            title="Playlists"
            description="Find personalized playlists for all tastes."
            href="/PlaylistsPage"
          />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
