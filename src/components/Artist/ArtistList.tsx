import ArtistCard from './ArtistCard';
import { useEffect, useState } from 'react';
import useFetchArtists from '@/hooks/artist/useFetchArtits';
import { ArtistsReponse } from '@/types/artist';


const ArtistList = () => {
  const [artists, setArtists] = useState<ArtistsReponse[]>([]);
  const { artists: fetchedArtists } = useFetchArtists();
 
  useEffect(() => {
    setArtists(fetchedArtists);
  }, [fetchedArtists]);

  const handleUpdateArtist = (updatedArtist: ArtistsReponse) => {
    setArtists((prev) =>
      prev.map((artist) =>
        artist.name === updatedArtist.name ? updatedArtist : artist
      )
    );
  };

  const handleDeleteArtist = (artistName: string) => {
    setArtists((prev) => prev.filter((artist) => artist.name !== artistName));
  };

  return (
    <ul className="space-y-4">
      {artists.map((artist) => (
        <li key={artist['@key']}>
          <ArtistCard artist={artist} onDeleteArtist={ handleDeleteArtist } onUpdateArtist={ handleUpdateArtist } />
        </li>
      ))}
    </ul>
  );
};

export default ArtistList;
