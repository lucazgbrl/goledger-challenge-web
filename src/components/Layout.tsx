import NavigationCard from "./NavigationCard";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-800 p-8">
    <section className="w-64 bg-gray-900 p-6 shadow-lg fixed h-full top-0">
    <Link href={"/"}><h2 className="text-xl font-bold text-blue-500 mb-6">Streaming App</h2></Link>
      <NavigationCard
        title="Artists"
        description="Discover new artists and their music."
        href="/artists"
      />
      <NavigationCard
        title="Albums"
        description="Explore the most popular albums."
        href="/albums"
      />
      <NavigationCard
        title="Playlists"
        description="Find personalized playlists for all tastes."
        href="/playlists"
      />
      <NavigationCard
        title="Songs"
        description="Listen to your favorite songs."
        href="/songs"
      />
    </section>

    <main className="ml-64 p-8">
      {children}
    </main>
  </div>
);

export default Layout;