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
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Create New Playlist</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="playlistName" className="block text-sm font-medium text-gray-700">
            Playlist Name
          </label>
          <input
            type="text"
            id="playlistName"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter playlist name"
            required
          />
        </div>
        <div>
          <label htmlFor="searchSongs" className="block text-sm font-medium text-gray-700">
            Search Songs
          </label>
          <input
            type="text"
            id="searchSongs"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Search for songs"
          />
          {songResults.length > 0 && (
            <ul className="mt-2 border border-gray-300 rounded-md shadow-sm max-h-40 overflow-y-auto">
              {songResults.map((song) => (
                <li
                  key={song["@key"]}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
            <h3 className="text-sm font-medium text-gray-700">Selected Songs</h3>
            <ul className="mt-2 space-y-1">
              {selectedSongs.map((song) => (
                <li
                  key={song["@key"]}
                  className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md"
                >
                  {song.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveSong(song["@key"])}
                    className="text-red-600 hover:underline"
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
          className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Creating..." : "Create Playlist"}
        </button>
      </form>
      {successMessage && <p className="mt-4 text-green-600">{successMessage}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      <button
        onClick={onClose}
        className="mt-4 text-sm text-gray-600 underline hover:text-gray-800"
      >
        Cancel
      </button>
    </div>
  );
};

export default PlaylistForm;
