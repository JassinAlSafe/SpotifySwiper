// import axios from "axios";
// import { SpotifyTrack } from "../types";

// // Function to fetch recommendations based on seed tracks and artists
// export const fetchRecommendations = async (
//   accessToken: string,
//   seedTracks: string[],
//   seedArtists: string[],
//   limit: number = 10
// ): Promise<SpotifyTrack[]> => {
//   if (seedTracks.length === 0 && seedArtists.length === 0) {
//     console.error("No seed tracks or artists provided");
//     return [];
//   }

//   try {
//     const response = await axios.get(
//       "https://api.spotify.com/v1/recommendations",
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         params: {
//           seed_tracks: seedTracks.join(","),
//           seed_artists: seedArtists.join(","),
//           limit,
//         },
//       }
//     );
//     return response.data.tracks; // Returning the array of recommended tracks
//   } catch (error) {
//     console.error("Error fetching recommendations:", error);
//     throw error; // Rethrow the error so it can be caught by the calling function
//   }
// };

// export default fetchRecommendations;
