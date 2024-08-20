import React from "react";
import { useNavigate } from "react-router";

const Menu: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Remove the token from local storage
    window.localStorage.removeItem("spotify_token");

    // Optionally, navigate the user back to the home page or login page
    navigate("/");
    window.location.reload(); // Refresh the page to clear any remaining state
  };

  return (
    <div>
      <h1 className="mb-5">Menu</h1>
      <button onClick={() => navigate("/currently-playing")}>
        Currently Playing
      </button>
      <button onClick={() => navigate("/spotify-rec")}>
        Spotify Recommendations
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Menu;
