import React, { useState } from "react";
import axios from "axios";
import loader from "./loader.gif";
export default function App() {
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [albumId, setAlbumId] = useState("");
  const [photos, setPhotos] = useState([]);
  const fetchPhotos = (e, id) => {
    e.preventDefault();
    if (id > 0 && id <= 100) {
      if (photos.length > 1) {
        setPhotos([]);
        setLoading(true);
      }
      axios
        .get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
        .then((response) => analyzer(response.data));
    } else {
      setWarning(true);
    }
  };

  function analyzer(data) {
    if (data.length > 1) {
      setLoading(false);
      setPhotos(data);
    }
  }
  return (
    <div className='container'>
      {warning && (
        <div className='warning'>
          <p> Input range is only from 1 to 100</p>
          <span onClick={() => setWarning(false)}>&#10006;</span>
        </div>
      )}
      <form className='inputdiv' onSubmit={(e) => fetchPhotos(e, albumId)}>
        <input
          placeholder='Enter Album number'
          type='text'
          pattern='[0-9.]+'
          onChange={(e) => setAlbumId(e.target.value)}
        />
        <button type='submit'>fetch data</button>
      </form>
      {loading && <img src={loader} alt='loader' id='loader' />}
      {photos.length > 1 ? (
        <div className='photo_container'>
          {photos.map((e, index) => (
            <div className='card' key={index}>
              <img className='image' src={e.url} alt={e.title} />
              <p className='title'>{e.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>enter an album id ...</div>
      )}
    </div>
  );
}
