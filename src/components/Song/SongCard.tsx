import { SongResponse } from "@/types/song";

interface SongCardProps {
  song: SongResponse;
}

const SongCard = ({ song }: SongCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <h2 className="text-xl font-semibold text-gray-800">{song.label}</h2>
    <ul className="mt-2 space-y-1">
      {song.props.map((prop, idx) => (
        <li key={idx} className="text-sm text-gray-600">
          <strong>{prop.label}:</strong> {prop.description}
        </li>
      ))}
    </ul>
  </div>
);

export default SongCard;