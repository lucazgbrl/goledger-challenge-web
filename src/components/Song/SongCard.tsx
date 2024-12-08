interface SongCardProps {
  name: string;
  album: string;
}

const SongCard = ({ name, album }: SongCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
    <p className="text-gray-500 mt-2">{album}</p>
  </div>
);

export default SongCard;