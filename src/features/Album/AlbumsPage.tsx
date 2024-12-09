import AlbumForm from "@/components/Album/AlbumForm";
import AlbumList from "@/components/Album/AlbumList";
import { AlbumResponse } from '@/types/album';
import { useState, useEffect } from 'react';
import useFetchAlbums from '@/hooks/album/useFetchAlbums';

const AlbumsPage = () => {
  const [albums, setAlbums] = useState<AlbumResponse[]>([]);
  const { albums: fetchedAlbums } = useFetchAlbums();

  useEffect(() => {
    setAlbums(fetchedAlbums);
  }, [fetchedAlbums]);

  const handleUpdateAlbum = (updatedAlbum: AlbumResponse) => {
    setAlbums((prevAlbums) =>
      prevAlbums.map((album) =>
        album.name === updatedAlbum.name && album.artist === updatedAlbum.artist
          ? updatedAlbum
          : album
      )
    );
  };

  const handleDeleteAlbum = (deletedAlbum: AlbumResponse) => {
    setAlbums((prevAlbums) =>
      prevAlbums.filter((album) => album.name !== deletedAlbum.name)
    );
  };

  const handleAddAlbum = (newAlbum: AlbumResponse) => {
    setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-blue-500 mb-2">Albums</h1>
        <p className="text-lg text-gray-300">Discover and manage your favorite albums</p>
      </header>

      <main>
        <div className="max-w-4xl mx-auto space-y-8">
          <AlbumForm onNewAlbum={ handleAddAlbum } />
          <AlbumList albums={ albums } onDelete={ handleDeleteAlbum } onUpdate={ handleUpdateAlbum } />
        </div>
      </main>
    </div>
  );
};


export default AlbumsPage;