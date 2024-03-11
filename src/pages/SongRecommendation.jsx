import React, { useState, useEffect } from 'react';
import ArtistCard from '../components/ArtistCard.jsx';

const SongRecommendation = () => {
  const [userTopArtists, setUserTopArtists] = useState([]);
  const [mappedArtists, setMappedArtists] = useState([]);

  const getTopArtists = () => {
    fetch("http://localhost:8080/api/user-top-artists")
      .then((response) => response.json())
      .then(data => {
        setUserTopArtists(data)
        console.log(data)
      })
  }

  useEffect(() => {
    if (userTopArtists.length > 0) {
      const cardTest = userTopArtists.map((artist) => {
        return <ArtistCard key={artist.id} artist={artist} />
      })
      setMappedArtists(cardTest)
    }
  }, [userTopArtists])

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Get Most Listened to Artists Here!</h1>
        <button className="button" onClick={getTopArtists}>Get Artists</button>
      </header>
      <div className="artist-section">
        <h2 className="artist-title">Artists</h2>
        <div className="artist-list">
          {mappedArtists}
        </div>
      </div>
    </div>
  )
}


export default SongRecommendation;
