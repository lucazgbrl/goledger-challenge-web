import { useState } from "react";
import { createSong } from "@/api/song";
import { queryAlbumByName } from "@/api/album";
import { toast } from "react-toastify";
import { SongWithAlbumName } from "@/types/song";

interface Props {
  onNewSong: (newSong: SongWithAlbumName) => void;
}

const SongForm = ({ onNewSong }: Props) => {
  const [formData, setFormData] = useState({ name: "", album: "" });
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const albumData = await queryAlbumByName(formData.album);

      if (!albumData.result.length) {
        throw new Error(`Album ${formData.album} not found!`);
      }

      const newSong = await createSong({
        name: formData.name,
        album: {
          "@key": albumData.result[0]["@key"],
        },
      });

      onNewSong({
        ...newSong,
        name: formData.name,
        albumName: formData.album,
      });
      toast.success(`Song ${formData.name} added successfully!`);
      setFormData({ name: "", album: "" });
      setIsFormVisible(false);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-black rounded-lg shadow-2xl p-6 max-w-sm mx-auto mb-4 hover:scale-105 transition duration-300">
      {!isFormVisible ? (
        <button
          onClick={() => setIsFormVisible(true)}
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Add Song
        </button>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-6">Add New Song</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-300">
                Song Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
              />
            </div>
            <div>
              <label htmlFor="album" className="block text-lg font-medium text-gray-300">
                Album
              </label>
              <input
                type="text"
                id="album"
                name="album"
                value={formData.album}
                onChange={handleChange}
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-white"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                {loading ? "Adding..." : "Add Song"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default SongForm;
