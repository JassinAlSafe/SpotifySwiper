import React, { useEffect } from "react";
import { fetchTopTracks, fetchTopArtists } from "../Api/fetchTopTracks";

const DebugTopData: React.FC = () => {
  useEffect(() => {
    const accessToken = window.localStorage.getItem("spotify_token");

    if (accessToken) {
      fetchTopTracks(accessToken).then((tracks) => {
        console.log("Fetched top tracks:", tracks);
      });

      fetchTopArtists(accessToken).then((artists) => {
        console.log("Fetched top artists:", artists);
      });
    } else {
      console.error("No access token found");
    }
  }, []);

  return <div>Check the console for top tracks and artists data.</div>;
};

export default DebugTopData;