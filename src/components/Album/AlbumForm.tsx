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
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      {!isFormVisible ? (
        <button
          onClick={() => setIsFormVisible(true)}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Album
        </button>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center mb-4">Add New Album</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Album Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Album Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700"
              >
                Release Year
              </label>
              <input
                type="text"
                name="year"
                id="year"
                value={formData.year}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Release Year"
                required
              />
            </div>
            <div>
              <label
                htmlFor="artist"
                className="block text-sm font-medium text-gray-700"
              >
                Artist Name
              </label>
              <input
                type="text"
                name="artist"
                id="artist"
                value={formData.artist}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Artist Name"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Adding..." : "Submit"}
            </button>
          </form>

          {successMessage && (
            <p className="mt-4 text-green-600 text-center">{successMessage}</p>
          )}
          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        </>
      )}
    </div>
  );
};

export default AlbumForm;
