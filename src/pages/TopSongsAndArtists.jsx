import React, { useState, useEffect } from 'react';
import ArtistCard from '../components/ArtistCard.jsx';
import TrackCard from '../components/TrackCard.jsx';

const TopTracksAndArtists = () => {
  const [userTopArtists, setUserTopArtists] = useState([]);
  const [userTopTracks, setUserTopTracks] = useState([]);
  const [mappedArtists, setMappedArtists] = useState([]);
  const [mappedTracks, setMappedTracks] = useState([]);
  const [currentButtonClicked, setCurrentButtonClicked] = useState('');
  const [fetching, setFetching] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('short_term');
  const [number, setNumber] = useState('10');


  const fetchData = (endpoint, setterFunction, buttonClickedSetter, selectedTerm, number) => {
    if (validateInfo(selectedTerm, number)) {
      return;
    }
    setFetching(true);
    setCurrentButtonClicked(buttonClickedSetter);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        limit: number,
        offset: 0,
        timeRange: selectedTerm
      })
    };
  
    fetch(`http://localhost:8080/auth/${endpoint}`, requestOptions)
      .then((response) => response.json())
      .then(data => {
        setterFunction(data);
        console.log(data);
        setFetching(false);
      });
  };
  
  const getTopArtists = () => {
    fetchData('user-top-artists', setUserTopArtists, 'Artists', selectedTerm, number);
  };
  
  const getTopTracks = () => {
    fetchData('user-top-tracks', setUserTopTracks, 'Tracks', selectedTerm, number);
  };
  

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

  const handleTermChange = (event) => {
    setSelectedTerm(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }


  const validateInfo = (selectedTerm, number) => {
    let errors = [];
    if(selectedTerm === "") {
      errors.push("Term must be selected")
    }
    if(number < 0 || number > 50 || Number.isInteger(number)) {
      errors.push("Number must be an integer between 1 and 50")
    }
    if(errors.length > 0) {
      window.alert(errors)
      return true
    }
    return false
  }

//TODO I will need to condense the code to make it more efficient but for now this will do

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Get most listened to artists or tracks!</h1>
        <div className="trackAndArtistNumber">
          <label>Short Term&nbsp;&nbsp;
            <input type="radio" id="shortTerm" name="term" value="short_term" checked={selectedTerm === 'short_term'} onChange={handleTermChange}></input>
          </label>

          <label>Medium Term&nbsp;&nbsp;
            <input type="radio" id="mediumTerm" name="term" value="medium_term" checked={selectedTerm === 'medium_term'} onChange={handleTermChange}></input>
          </label>
          
          <label>Long Term&nbsp;&nbsp;
            <input type="radio" id="longTerm" name="term" value="long_term" checked={selectedTerm === 'long_term'} onChange={handleTermChange}></input>
          </label>
        </div>
        <label># of Artists/Tracks
          <div>
            <input type="text" id="number" onChange={handleNumberChange} value={number}></input>
          </div><br></br>
        </label>
        <button className="button" onClick={getTopArtists}>Get Artists</button>
        <button className="button" onClick={getTopTracks}>Get Tracks</button>
      </header>
      <div className="artist-section">
        <h1 className="artist-title">{!fetching ? currentButtonClicked : ""}</h1>
        <div className="artist-list">
          {fetching ? <h1>Loading...</h1> 
              :
              (currentButtonClicked === "Artists" ? mappedArtists : mappedTracks)
          }
        </div>
      </div>
    </div>
  )
}


export default TopTracksAndArtists;
