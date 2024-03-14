import { useState, useEffect } from "react";
import SongList from "./SongList";
import "./App.css";
import SongForm from "./SongForm";

function App() {
  const [songs, setSongs] = useState([]);
  const [showAddSongForm, setShowAddSongForm] = useState(false);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const response = await fetch("http://127.0.0.1:5000/songs");
    const data = await response.json();
    setSongs(data.songs);
    console.log(data.songs);
  };

  const toggleAddSongForm = () => {
    setShowAddSongForm(!showAddSongForm);
  };

  return (
    <div className="App">
      <div class="toggle-form">
        <button onClick={toggleAddSongForm} className="btn btn-primary">
          {showAddSongForm ? "Hide Add Song Form" : "Add Song"}
        </button>
      </div>
      {showAddSongForm && <SongForm />}
      <SongList songs={songs} />
    </div>
  );
}

export default App;
