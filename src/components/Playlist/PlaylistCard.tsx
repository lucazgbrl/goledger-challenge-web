import { Playlist } from "@/types/playlist";

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <h2 className="text-xl font-semibold">{playlist.name}</h2>
    <ul className="mt-2">
      {playlist.songs.map((song, idx) => (
        <li key={idx} className="text-gray-600">
          {song.name} - {song.album}
        </li>
      ))}
    </ul>
  </div>
);

export default PlaylistCard;

