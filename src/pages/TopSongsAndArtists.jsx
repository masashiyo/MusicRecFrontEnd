import React, { useState, useEffect } from 'react';
import ArtistCard from '../components/ArtistCard.jsx';
import TrackCard from '../components/TrackCard.jsx';
import NavigationBar from '../components/NavigationBar.jsx';
import Footer from '../components/Footer.jsx';

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
  
    fetch(`http://localhost:8080/api/${endpoint}?timeRange=${selectedTerm}&limit=${number}&offset=0`, { credentials: 'include' })
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

return (
  <div className="flex flex-col min-h-screen">
    <NavigationBar/>
    <header className="bg-green-500 text-white py-8 flex flex-col items-center font-semibold font-sans pt-12">
      <h1 className="text-6xl mb-12 mt-8">Most Listened to Artists and Tracks</h1>
      <div className="trackAndArtistNumber flex justify-center mb-8">
        <label className="mr-8">
          Last 4 Weeks&nbsp;&nbsp;
          <input type="radio" id="shortTerm" name="term" value="short_term" checked={selectedTerm === 'short_term'} onChange={handleTermChange} />
        </label>
        <label className="mr-8">
          Last 6 Months&nbsp;&nbsp;
          <input type="radio" id="mediumTerm" name="term" value="medium_term" checked={selectedTerm === 'medium_term'} onChange={handleTermChange} />
        </label>
        <label>
          Last 12 Months&nbsp;&nbsp;
          <input type="radio" id="longTerm" name="term" value="long_term" checked={selectedTerm === 'long_term'} onChange={handleTermChange} />
        </label>
      </div>
      <div className='mb-8'>
        <label className="block mb-4 text-center">
          Number of Artists/Tracks
          <input type="text" id="number" onChange={handleNumberChange} value={number} className="block mt-2 w-full text-black text-center bg-white rounded-full py-2 px-4" />
        </label>
      </div>
      <div className="flex">
        <button className="bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 border transform hover:scale-105" onClick={getTopArtists}>Get Artists</button>
        <button className="bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 ml-5 border transform hover:scale-105" onClick={getTopTracks}>Get Tracks</button>
      </div>
    </header>
    <div className="justify-center flex-grow">
      <h1 className="text-6xl m-10 text-center font-semibold">{!fetching ? currentButtonClicked : ""}</h1>
      <div className="flex flex-col items-center mx-auto w-[50%]">
        {fetching ? 
          <div className="">
            <h1 className='text-6xl'>Loading...</h1>
          </div> : 
          (currentButtonClicked === "Artists" ? mappedArtists : mappedTracks)
        }
      </div>
    </div>
    <Footer/>
  </div>
)

}


export default TopTracksAndArtists;
