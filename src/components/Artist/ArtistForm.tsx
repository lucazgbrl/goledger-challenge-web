import { useState } from "react";
import { createArtist } from "@/api/artist";
import { ArtistsResponse } from "@/types/artist";
import { toast } from "react-toastify";

type Props = {
  onNewArtist: (newArtist: ArtistsResponse) => void;
};

const ArtistForm = ({ onNewArtist }: Props) => {
  const [formData, setFormData] = useState({ name: "", country: "" });
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
      const newArtist = await createArtist({
        name: formData.name,
        country: formData.country,
      });
      onNewArtist(newArtist);
      toast.success(`Artist ${formData.name} added successfully!`);
      setFormData({ name: "", country: "" });
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
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Add Artist
        </button>
      ) : (
        <div className="transition-all duration-300 transform">
          <h2 className="text-2xl font-bold text-center text-white mb-4">Add New Artist</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white bg-gray-700"
                placeholder="Artist Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-300"
              >
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white bg-gray-700"
                placeholder="Country"
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
        </div>
      )}
    </div>
  );
};

export default ArtistForm;
