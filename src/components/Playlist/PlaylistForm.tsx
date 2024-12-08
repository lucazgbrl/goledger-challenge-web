import { useState } from "react";
import { createPlaylist } from "@/api/playlist";
import { searchSongsByName } from "@/api/song";

const PlaylistForm = ({ onClose }: { onClose: () => void }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [songResults, setSongResults] = useState<{ "@key": string; name: string }[]>([]);
  const [selectedSongs, setSelectedSongs] = useState<{ "@key": string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSongResults([]);
      return;
    }
    try {
      const results = await searchSongsByName(query);
      setSongResults(results.result);
    } catch (err) {
      console.error("Error fetching songs:", err);
    }
  };

  const handleAddSong = (song: { "@key": string; name: string }) => {
    if (!selectedSongs.some((s) => s["@key"] === song["@key"])) {
      setSelectedSongs([...selectedSongs, song]);
    }
    setSongResults([]);
    setSearchQuery("");
  };

  const handleRemoveSong = (key: string) => {
    setSelectedSongs(selectedSongs.filter((song) => song["@key"] !== key));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (!playlistName.trim()) {
        throw new Error("Playlist name is required.");
      }
      await createPlaylist({
            name: playlistName,
            songs: selectedSongs.map((song) => ({ "@key": song["@key"], "@assetType": "song" })),
            private: false,
          });
      setSuccessMessage("Playlist created successfully!");
      setPlaylistName("");
      setSelectedSongs([]);
      onClose(); // Close the form on success
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create playlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-black rounded-lg shadow-2xl p-6 max-w-sm mx-auto mb-4 hover:scale-105 transition duration-300">
      <h2 className="text-2xl font-semibold text-white text-center mb-6">Create New Playlist</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="playlistName" className="block text-sm font-medium text-gray-300">
            Playlist Name
          </label>
          <input
            type="text"
            id="playlistName"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="mt-2 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter playlist name"
            required
          />
        </div>
        <div>
          <label htmlFor="searchSongs" className="block text-sm font-medium text-gray-300">
            Search Songs
          </label>
          <input
            type="text"
            id="searchSongs"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="mt-2 w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for songs"
          />
          {songResults.length > 0 && (
            <ul className="mt-2 bg-gray-700 border border-gray-600 rounded-md max-h-40 overflow-y-auto">
              {songResults.map((song) => (
                <li
                  key={song["@key"]}
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleAddSong(song)}
                >
                  {song.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedSongs.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-300">Selected Songs</h3>
            <ul className="mt-2 space-y-2">
              {selectedSongs.map((song) => (
                <li
                  key={song["@key"]}
                  className="flex justify-between items-center bg-gray-700 px-4 py-2 rounded-md"
                >
                  {song.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveSong(song["@key"])}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 text-white font-semibold rounded-md ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating..." : "Create Playlist"}
        </button>
      </form>
      {successMessage && <p className="mt-4 text-green-400">{successMessage}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <button
        onClick={onClose}
        className="mt-4 text-sm text-gray-400 underline hover:text-gray-200"
      >
        Cancel
      </button>
    </div>
  );
};

export default PlaylistForm;
