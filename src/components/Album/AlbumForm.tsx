import { useState } from "react";
import { createAlbum } from "@/api/album";
import { readArtistByName } from "@/api/artist";

const AlbumForm = () => {
  const [formData, setFormData] = useState({ name: "", year: "", artist: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const artistData = await readArtistByName(formData.artist);

      if (!artistData) {
        setError("Artist not found.");
        return;
      }

      await createAlbum({
        name: formData.name,
        year: formData.year,
        artist: artistData,
      });

      setSuccessMessage("Album successfully added!");
      setFormData({ name: "", year: "", artist: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add album.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mb-4">
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

          {successMessage && <p className="mt-4 text-green-500 text-center">{successMessage}</p>}
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </>
      )}
    </div>
  );
};

export default AlbumForm;
