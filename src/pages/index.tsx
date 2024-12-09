import useDocumentTitle from "@/hooks/useDocumentTite";

const HomePage = () => {
  useDocumentTitle("Home");

  return (
    <div className="min-h-screen bg-gray-800 p-8">  
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to the Streaming App!</h1>
        <p className="mt-2 text-lg text-gray-300">Explore artists, albums, and playlists.</p>
      </header>

      <main>
      
      </main>
    </div>
  );
};

export default HomePage;
