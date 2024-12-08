import { useState } from "react";
import { createSong } from "@/api/song";
import { queryAlbumByName } from "@/api/album";

const SongForm = () => {
  const [formData, setFormData] = useState({ name: "", album: "" });
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
      const albumData = await queryAlbumByName(formData.album);

      if (!albumData) {
        setError("Album not found.");
        return;
      }

      await createSong({
        name: formData.name,
        album: {
          "@key": albumData.result[0]["@key"],
          name: albumData.result[0].name,
        },
      });

      setSuccessMessage("Song successfully added!");
      setFormData({ name: "", album: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add song.");
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
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            {successMessage && <p className="text-green-600 text-sm text-center">{successMessage}</p>}
          </form>
        </>
      )}
    </div>
  );
}

export default SongForm;
