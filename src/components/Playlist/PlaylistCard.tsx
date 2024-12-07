import { PlaylistResponse } from "@/types/playlist";

interface PlaylistCardProps {
  playlist: PlaylistResponse;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <h2 className="text-xl font-semibold text-gray-800">{playlist.label}</h2>
    <ul className="mt-2 space-y-1">
      {playlist.props.map((prop, idx) => (
        <li key={idx} className="text-sm text-gray-600">
          <strong>{prop.label}:</strong> {prop.description}
        </li>
      ))}
    </ul>
  </div>
);

export default PlaylistCard;