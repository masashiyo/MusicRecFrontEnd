import React, { useState, useEffect } from 'react';
import ArtistCard from '../components/ArtistCard.jsx';
import TrackCard from '../components/TrackCard.jsx';

const TopTracksAndArtists = () => {
  const [userTopArtists, setUserTopArtists] = useState([]);
  const [userTopTracks, setUserTopTracks] = useState([]);
  const [mappedArtists, setMappedArtists] = useState([]);
  const [mappedTracks, setMappedTracks] = useState([]);
  const [currentButtonClicked, setCurrentButtonClicked] = useState('');

  const getTopArtists = () => {
    setCurrentButtonClicked("Artists")
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        limit: 10,
        offset: 0,
        timeRange: 'long_term'
      })
    };
  
    fetch("http://localhost:8080/api/user-top-artists", requestOptions)
      .then((response) => response.json())
      .then(data => {
        setUserTopArtists(data)
        console.log(data)
      })
  }
  const getTopTracks = () => {
    setCurrentButtonClicked("Tracks")
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        limit: 10,
        offset: 0,
        timeRange: 'long_term'
      })
    };
  
    fetch("http://localhost:8080/api/user-top-tracks", requestOptions)
      .then((response) => response.json())
      .then(data => {
        setUserTopTracks(data)
        console.log(data)
      })
  }

  useEffect(() => {
    if(userTopArtists.length > 0) {
      const artistData = userTopArtists.map((artist) => {
        return <ArtistCard key={artist.id} artist={artist} />
      })
      setMappedArtists(artistData)
    }
    if(userTopTracks.length > 0) {
      const trackData = userTopTracks.map((track) => {
        return <TrackCard key={track.id} track={track} />
      })
      setMappedTracks(trackData)
    }
  }, [userTopArtists, userTopTracks])

//TODO I will need to condense the code to make it more efficient but for now this will do

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Get most listened to artists or tracks!</h1>
        <br></br>
        <div>
          <label>Short Term </label>
          <input type="radio" id="shortTerm" name="term" value="short_term"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label>Medium Term </label>
          <input type="radio" id="mediumTerm" name="term" value="medium_term"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label>Long Term </label>
          <input type="radio" id="longTerm" name="term" value="long_term"></input>
        </div><br></br>
        <label># of Artists/Tracks </label>
        <div>
          <input type="text" id="number"></input>
        </div><br></br>
        <button className="button" onClick={getTopArtists}>Get Artists</button>
        <button className="button" onClick={getTopTracks}>Get Tracks</button>
      </header>
      <div className="artist-section">
        <h2 className="artist-title">{currentButtonClicked}</h2>
        <div className="artist-list">
          {currentButtonClicked === "Artists" ? mappedArtists : mappedTracks}
        </div>
      </div>
    </div>
  )
}


export default TopTracksAndArtists;
