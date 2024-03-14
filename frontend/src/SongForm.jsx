import { useState } from "react";
import "./SongForm.css"; // Import custom CSS file for additional styling

const SongForm = () => {
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [rating, setRating] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [runtime, setRuntime] = useState("");
  const [asoa, setAsoa] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = { songName, artist, album, rating, imgURL, runtime, asoa };
    console.log(data);
    const url = "http://127.0.0.1:5000/addsong";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      const data = await response.json();
      alert(data.message);
    } else {
      //successful
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit} className="song-form">
        <div className="form-group">
          <label htmlFor="songName">Song Name:</label>
          <input
            type="text"
            className="form-control"
            id="songName"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            className="form-control"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="album">Album:</label>
          <input
            type="text"
            className="form-control"
            id="album"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="text"
            className="form-control"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="imgURL">Image URL:</label>
          <input
            type="text"
            className="form-control"
            id="imgURL"
            value={imgURL}
            onChange={(e) => setImgURL(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="runtime">Runtime:</label>
          <input
            type="text"
            className="form-control"
            id="runtime"
            value={runtime}
            onChange={(e) => setRuntime(e.target.value)}
          />
        </div>

        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="asoa"
            checked={asoa}
            onChange={(e) => setAsoa(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="asoa">
            Adam's Seal of Approval
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SongForm;
