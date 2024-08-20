import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Home: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("spotify_token");

    if (!token && hash) {
      token =
        hash
          .substring(1)
          .split("&")
          .find((elem) => elem.startsWith("access_token"))
          ?.split("=")[1] || null;

      window.location.hash = "";
      if (token) window.localStorage.setItem("spotify_token", token);
    }

    setAccessToken(token);
  }, []);

  useEffect(() => {
    if (accessToken) {
      navigate("/menu");
    }
  }, [accessToken, navigate]);

  const login = () => {
    const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirect_uri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
    const auth_endpoint = "https://accounts.spotify.com/authorize";
    const scopes = ["user-read-playback-state", "user-read-currently-playing"];

    window.location.href = `${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token&scope=${scopes.join(
      "%20"
    )}`;
  };

  const logout = () => {
    window.localStorage.removeItem("spotify_token");
    setAccessToken(null);
    navigate("/");
  };

  return (
    <div>
      <button onClick={login}>Login to Spotify</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
