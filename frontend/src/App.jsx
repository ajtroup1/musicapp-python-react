import { useState, useEffect } from "react";
import SongList from "./SongList";
import "./App.css";
import SongForm from "./SongForm";

function App() {
  const [songs, setSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState({});

  useEffect(() => {
    fetchSongs();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSong({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (song) => {
    if (isModalOpen) return;
    setCurrentSong(song);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchSongs();
  };

  const fetchSongs = async () => {
    const response = await fetch("http://127.0.0.1:5000/songs");
    const data = await response.json();
    const rankedSongs = data.songs.sort((a, b) => b.rating - a.rating);
    setSongs(rankedSongs);
    console.log(rankedSongs);
  };

  return (
    <div>
      <button onClick={openCreateModal} id="add-song-button" className="btn btn-primary">Add a new song</button>
      <SongList
        songs={songs}
        updateSong={openEditModal}
        updateCallback={onUpdate}
      />
      {isModalOpen && (
        <div id="modal">
          <div id="modal-content">
            <span className="create-title">Add new song</span>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <br />
            <br />
            <SongForm existingSong={currentSong} updateCallback={onUpdate} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
