import { getSongByKey } from "@/api/song";
import { fetchAlbumNames } from "./fetchAlbumNames";

const fetchSongsFromPlaylist = async (playlist: {
  songs: { "@key": string }[];
}) => {
  try {
    const songsWithDetails = await Promise.all(
      playlist.songs.map(async (song) => {
        const fetchSong = await getSongByKey(song["@key"]);
        const songName = fetchSong.result[0].name;
        const songAlbumKey = [fetchSong.result[0].album["@key"]];
        const albumNames = await fetchAlbumNames(songAlbumKey);
        const songAlbum = albumNames[songAlbumKey[0]];

        return {
          name: songName,
          album: songAlbum,
        };
      })
    );

    return { ...playlist, songs: songsWithDetails };
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw new Error("Failed to fetch songs from playlist.");
  }
};

export default fetchSongsFromPlaylist;
