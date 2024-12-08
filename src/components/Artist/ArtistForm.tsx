import { useState } from "react";
import { createArtist } from "@/api/artist";

const ArtistForm = () => {
  const [formData, setFormData] = useState({ name: "", country: "" });
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
      await createArtist({
        name: formData.name,
        country: formData.country,
      });
      setSuccessMessage("Artist successfully added!");
      setFormData({ name: "", country: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add artist.");
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
          Add Artist
        </button>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center mb-4">Add New Artist</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Artist Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Country"
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

export default ArtistForm;
