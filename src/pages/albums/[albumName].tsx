import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getAlbums } from '@/api/album';
import { getSongs } from '@/api/song';
import { AlbumResponse } from '@/types/album';
import { SongResponse } from '@/types/song';
import SongList from '@/components/Song/SongList';
import { queryAssetByKey } from '@/api/api';

const AlbumSongs = () => {
  const [songs, setSongs] = useState<SongResponse[]>([]);
  const [album, setAlbum] = useState<AlbumResponse | null>(null);
  const router = useRouter();
  const { albumName } = router.query;


  useEffect(() => {
    const fetchAlbumData = async (name: string) => {
      try {
        // Get all albums
        const { result: albums } = await getAlbums();
        
        // Find the album by name
        const albumData = albums.find((album: AlbumResponse) => album.name === name);
        
        if (albumData) {
          setAlbum(albumData);
  
          // Get songs related to this album
          const { result: songs } = await getSongs();
          const songsForAlbum = songs.filter((song: SongResponse) => song.album['@key'] === albumData["@key"]);
          
          //get artist data
          const artist = await queryAssetByKey("artist",albumData.artist["@key"]);
  
          setAlbum({...albumData, artist: artist.result[0]});
  
          setSongs(songsForAlbum);
        } else {
          toast.error("Album not found");
        }
      } catch (error) {
        if (error instanceof Error){
          toast.error("Failed to load album data.");
        }
      }
    };

    if (albumName && typeof albumName === 'string') {
      fetchAlbumData(albumName);
    }
  }, [albumName]);

  if (!album) return <div>Loading album...</div>;

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">{album.name}</h1>
        {album.artist && <p className="text-lg text-gray-300">By {album.artist.name}</p>}
      </header>

      <SongList songs={songs} onDelete={(songData) => console.log('Delete song', songData)} />
    </div>
  );
};

export default AlbumSongs;
