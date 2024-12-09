// components/Album/AlbumList.tsx
import AlbumCard from './AlbumCard';
import { AlbumResponse } from '@/types/album';
import { useState, useEffect } from 'react';
import useFetchAlbums from '@/hooks/album/useFetchAlbums';

const AlbumList = () => {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {albums.length ? (
        albums.map((album) => (
          <AlbumCard key={album['@key']} album={album} onUpdate={ handleUpdateAlbum } onDelete={ handleDeleteAlbum } />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-400">No albums available</p>
      )}
    </div>
  );
};


export default AlbumList;
