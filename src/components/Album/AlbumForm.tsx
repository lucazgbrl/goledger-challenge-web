import { useState } from "react";
import { createAlbum } from "@/api/album";
import { readArtistByName } from "@/api/artist";
import { toast } from "react-toastify";
import { AlbumResponse } from "@/types/album";

interface AlbumFormProps {
  onNewAlbum: (newAlbum: AlbumResponse) => void;
}

const AlbumForm = ({ onNewAlbum }: AlbumFormProps) => {
  const [formData, setFormData] = useState({ name: "", year: "", artist: "" });
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
      const artistData = await readArtistByName(formData.artist);

      if (!artistData) {
        toast.error(`Artist ${formData.artist} not found!`);
        return;
      }

      const newAlbum = {
        name: formData.name,
        year: formData.year,
        artist: artistData,
      }

      await createAlbum(newAlbum);

      onNewAlbum(newAlbum);
      toast.success(`Album ${formData.name} added successfully!`);
      setFormData({ name: "", year: "", artist: "" });
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
    <div className="bg-gradient-to-r from-gray-800 to-black rounded-lg shadow-2xl p-6 max-w-sm mx-auto mb-4 hover:scale-105 transition duration-300 mt-4">
      {!isFormVisible ? (
        <button
          onClick={() => setIsFormVisible(true)}
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Add Album
        </button>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center mb-4 text-white">Add New Album</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Album Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white bg-gray-700"
                placeholder="Album Name"
                required
              />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-300">
                Release Year
              </label>
              <input
                type="text"
                name="year"
                id="year"
                value={formData.year}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white bg-gray-700"
                placeholder="Release Year"
                required
              />
            </div>
            <div>
              <label htmlFor="artist" className="block text-sm font-medium text-gray-300">
                Artist Name
              </label>
              <input
                type="text"
                name="artist"
                id="artist"
                value={formData.artist}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white bg-gray-700"
                placeholder="Artist Name"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Adding..." : "Submit"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AlbumForm;
