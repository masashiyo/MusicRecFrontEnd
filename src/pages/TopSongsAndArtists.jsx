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
    setFetching(true);
    setCurrentButtonClicked(buttonClickedSetter);
    const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: { 
        'Content-Type': 'application/json',
    },
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
    if(validateInfo(selectedTerm, number))
      return;
    setMappedArtists();
    fetchData('user-top-artists', setUserTopArtists, 'Artists', selectedTerm, number);
  };
  
  const getTopTracks = () => {
    if(validateInfo(selectedTerm, number))
      return;
    setMappedTracks();
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
    if (number < 0 || number > 50 || isNaN(parseInt(number)) || !Number.isInteger(parseFloat(number))) {
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
    <div>
    <header className="bg-green-500 text-white py-6 flex flex-col items-center">
      <h1 className="text-5xl mb-20 mt-6">Most Listened to Artists and Tracks</h1>
      <div className="trackAndArtistNumber flex justify-center mb-4">
        <label className="mr-6">
          Short Term&nbsp;&nbsp;
          <input type="radio" id="shortTerm" name="term" value="short_term" checked={selectedTerm === 'short_term'} onChange={handleTermChange} />
        </label>
        <label className="mr-6">
          Medium Term&nbsp;&nbsp;
          <input type="radio" id="mediumTerm" name="term" value="medium_term" checked={selectedTerm === 'medium_term'} onChange={handleTermChange} />
        </label>
        <label>
          Long Term&nbsp;&nbsp;
          <input type="radio" id="longTerm" name="term" value="long_term" checked={selectedTerm === 'long_term'} onChange={handleTermChange} />
        </label>
      </div>
      <div className=''>
        <label className="block mb-4 text-center">
          Number of Artists/Tracks
          <input type="text" id="number" onChange={handleNumberChange} value={number} className="block mt-2 w-full text-black" />
        </label>
      </div>
      <div className="flex">
        <button className="button mr-4 transition duration-300 ease-in-out hover:bg-green-700 p-3 rounded-lg border border-white" onClick={getTopArtists}>Get Artists</button>
        <button className="button transition duration-300 ease-in-out hover:bg-green-700 p-3 rounded-lg border border-white" onClick={getTopTracks}>Get Tracks</button>
      </div>
    </header>
    <div className="justify-center">
      <h1 className="text-6xl m-10 text-center">{!fetching ? currentButtonClicked : ""}</h1>
      <div className="flex flex-col items-center">
        {fetching ? <h1 className='text-6xl'>Loading...</h1> : (currentButtonClicked === "Artists" ? mappedArtists : mappedTracks)}
      </div>
    </div>
  </div>
  )
}


export default TopTracksAndArtists;
