import AlbumForm from "@/components/Album/AlbumForm";
import AlbumList from "@/components/Album/AlbumList";
import { AlbumResponse } from "@/types/album";

interface Props {
  albums: AlbumResponse[];
}

const AlbumsPage = ({ albums }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500">Albums</h1>
        <p className="mt-2 text-lg text-gray-600">Explore all albums.</p>
      </header>

      <main>
        <AlbumForm />
        <AlbumList albums={albums} />
      </main>
    </div>
  );
};

export default AlbumsPage;