import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getAlbums } from '@/api/album';
import { getSongs } from '@/api/song';
import { AlbumResponse } from '@/types/album';
import { SongResponse } from '@/types/song';
import SongList from '@/components/Song/SongList';
import { readArtistByName } from '@/api/artist';
import { ArtistsResponse } from '@/types/artist';

const ArtistSongs = () => {
  const [songs, setSongs] = useState<SongResponse[]>([]);
  const [artist, setArtist] = useState<ArtistsResponse>();  // Replace with actual artist fetching logic
  const router = useRouter();
  const { artistName } = router.query; // Assuming artist name is in the URL

  useEffect(() => {
    if (artistName && typeof artistName === 'string') {
      fetchArtistData(artistName); // Fetch the artist info by artistName
    }
  }, [artistName]);

  const fetchArtistData = async (name: string) => {
    try {
      // get artist data
      const artistData = await readArtistByName(name);

      const { result } = await getAlbums();

      const albumsByArtist = result.filter((album: AlbumResponse) => album.artist['@key'] === artistData["@key"]);

      //get all songs and filter for by album key

      const songsFromAlbums = await Promise.all(
        albumsByArtist.map(async (album: AlbumResponse) => {
          const { result: songs } = await getSongs();
          return songs.filter((song: SongResponse) => song.album['@key'] === album["@key"]);
        })
      );

      console.log(songsFromAlbums);
      setSongs(songsFromAlbums.flat());
      setArtist(artistData);  // Or fetch the full artist data if needed
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to load artist data.");
      }
    }
  };

  if (!artist) return <div>Loading artist...</div>;

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">{artist.name}</h1>
        <p className="text-lg text-gray-300">{artist.country}</p>
      </header>

      <SongList songs={songs} onDelete={(songData) => console.log('Delete song', songData)} />
    </div>
  );
};

export default ArtistSongs;
