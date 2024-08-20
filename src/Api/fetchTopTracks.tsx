import axios from "axios";
import { SpotifyArtist, SpotifyTrack } from "../types";

const fetchTopTracks = async (accessToken: string): Promise<SpotifyTrack[]> => {
  try {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: 10, // Adjust the limit as needed
        },
      }
    );
    console.log("top-tracks", data.items);
    return data.items; // Returns an array of top tracks
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    return []; // Return an empty array in case of an error
  }
};

const fetchTopArtists = async (
  accessToken: string
): Promise<SpotifyArtist[]> => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: 10, // You can adjust this limit as needed
        },
      }
    );

    console.log("Top artists fetched:", response.data.items);
    return response.data.items; // Returns an array of top artists
  } catch (error) {
    console.error("Error fetching top artists:", error);
    throw error;
  }
};


export { fetchTopTracks, fetchTopArtists };
