import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchTopTracks, fetchTopArtists } from "../Api/fetchTopTracks";
import { SpotifyTrack } from "../types";

const SpotifyRec: React.FC = () => {
  const [recommendations, setRecommendations] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const accessToken = window.localStorage.getItem("spotify_token");

  useEffect(() => {
    const getRecommendations = async () => {
      if (accessToken) {
        try {
          // Fetch the user's top tracks and artists
          const topTracks = await fetchTopTracks(accessToken);
          const topArtists = await fetchTopArtists(accessToken);

          // Ensure there is at least one track and artist to use as seeds
          if (topTracks.length > 0 && topArtists.length > 0) {
            const seedTrackIds = topTracks.slice(0, 2).map((track) => track.id); // Using the first two tracks
            const seedArtistIds = topArtists
              .slice(0, 2)
              .map((artist) => artist.id); // Using the first two artists

            // Fetch recommendations using the seeds directly here
            const response = await axios.get(
              "https://api.spotify.com/v1/recommendations",
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
                params: {
                  seed_tracks: seedTrackIds.join(","),
                  seed_artists: seedArtistIds.join(","),
                  limit: 10,
                },
              }
            );

            // Set the fetched recommendations into state
            setRecommendations(response.data.tracks);
          } else {
            setError("No top tracks or artists available for recommendations");
          }
        } catch (error) {
          setError("Error fetching recommendations");
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setError("No access token found. Please log in again.");
      }
    };

    getRecommendations();
  }, [accessToken]);

  if (loading) {
    return <p>Loading recommendations...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Recommended Tracks for You</h2>
      <ul>
        {recommendations.map((track) => (
          <li key={track.id}>
            {track.name} by{" "}
            {track.artists.map((artist) => artist.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotifyRec;
