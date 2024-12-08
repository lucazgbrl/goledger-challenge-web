import AlbumForm from "@/components/Album/AlbumForm";
import AlbumList from "@/components/Album/AlbumList";
import { AlbumResponse } from "@/types/album";

interface Props {
  albums: AlbumResponse[];
}

const AlbumsPage = ({ albums }: Props) => {
  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-blue-500 mb-2">Albums</h1>
        <p className="text-lg text-gray-300">Discover and manage your favorite albums</p>
      </header>

      <main>
        <div className="max-w-4xl mx-auto space-y-8">
          <AlbumForm />
          <AlbumList albums={albums} />
        </div>
      </main>
    </div>
  );
};


export default AlbumsPage;