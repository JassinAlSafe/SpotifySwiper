import React, { useEffect, useState } from "react";
import axios from "axios";
import { SpotifyCurrentlyPlaying } from "../types";
import SpotifyLogo from "../assets/Spotify_Icon_RGB_Green.png";

const CurrentlyPlaying: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] =
    useState<SpotifyCurrentlyPlaying | null>(null);

  useEffect(() => {
    const token = window.localStorage.getItem("spotify_token");
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    const fetchData = async () => {
      try {
        const { data } = await axios.get<SpotifyCurrentlyPlaying>(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCurrentTrack(data);
      } catch (error) {
        console.error("Error fetching currently playing track:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <img
          src={SpotifyLogo}
          alt="Spotify Logo"
          width={100}
          className="mx-auto mb-5"
        />      </div>
      <div>
        {currentTrack && currentTrack.item ? (
          <div>
            <h2>Now Playing:</h2>
          
            {currentTrack.item.album.images[0] && (
              <img
                src={currentTrack.item.album.images[0].url}
                alt={currentTrack.item.name}
                width={300}
              />
              
            )}
              <p>
              {currentTrack.item.name} by{" "}
              {currentTrack.item.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        ) : (
          <p>No track is currently playing.</p>
        )}
      </div>
    </div>
  );
};



export default CurrentlyPlaying;