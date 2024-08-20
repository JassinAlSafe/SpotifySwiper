import { Route, Routes} from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import CurrentlyPlaying from "./pages/CurrentlyPLaying"
import SpotifyRec from "./pages/SpotifyRec";
import DebugTopData from "./pages/DebugTopData";


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/currently-playing" element={<CurrentlyPlaying />} />
        <Route path="/spotify-rec" element={<SpotifyRec />} />
        <Route path="/debug-top-data" element={<DebugTopData />} />
      </Routes>
    </div>
  )
}

export default App
