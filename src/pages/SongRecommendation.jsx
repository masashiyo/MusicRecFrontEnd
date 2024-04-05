import React, { useState, useEffect } from 'react';
import SongSearchBar from '../components/SongSearchBar';
import SongRecModal from '../components/SongRecModal';
import TrackCard from '../components/TrackCard';
import NavigationBar from '../components/NavigationBar';

const SongRecommendation = () => {
    const [tracksSelected, setTracksSelected] = useState([]);
    const [mappedTracks, setMappedTracks] = useState([])
    const [modal, setModal] = useState(false);
    const [trackList, setTrackList] = useState([]);
    const [fetching, setFetching] = useState(false)

    const sendTrackToParent = (tracks) => {
        setTracksSelected(tracks);
        mapTracksToCard(tracks)
    }

    const toggleModal = () => {
        setModal(!modal)
    }

    const createTrackPayload = (tracks) => {
        const trackIds = tracks.map(track => track.id);
        return trackIds.join(",");
    }

    const clearSelectedTracks = () => {
        setTracksSelected([]);
        setMappedTracks([])
    }

    const fetchResults = async () => {
        if(tracksSelected.length < 1)
            return;
        let trackPayload = createTrackPayload(tracksSelected)
        try {
            setFetching(true)
            setTrackList([])
            const requestOptions = {
                method: 'POST',
                credentials: 'include',
                headers: { 
                    'Content-Type': 'application/json' ,
                },
                body: JSON.stringify({
                  limit: 10,
                  tracks: trackPayload
                })
              };
            const response = await fetch(`http://localhost:8080/api/songRecs`,requestOptions);
            const data = await response.json();
            setFetching(false)
            setTrackList(data)
            if(!modal)
                toggleModal()
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const mapTracksToCard = (tracks) => {
        if(tracks.length > 0) {
            const trackData = tracks.map((track) => {
              return <TrackCard key={track.id} track={track} />
            })
            setMappedTracks(trackData)
        }
    }
    
    return (
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <NavigationBar />
            <div className="bg-green-500 text-white py-12 mb-10 flex flex-col items-center">
              <h1 className="text-5xl mb-20 mt-6 font-semibold">Song Recommendations</h1>
            </div>
            <SongSearchBar sendTrackToParent={sendTrackToParent} tracksSelected={tracksSelected}/>
            <div className="flex justify-center">
              <div className="mt-20 w-[83.5%] mx-auto flex flex-col items-center">
                {mappedTracks}
              </div>
            </div>
            <div className="flex justify-center my-12">
              {tracksSelected.length > 0 &&
                <button onClick={() => clearSelectedTracks()} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 transform hover:scale-105">Clear All</button>
              }
              {tracksSelected.length > 0 && 
                <button onClick={() => fetchResults()} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 ml-5 transform hover:scale-105">Get Tracks</button>
              }
            </div>
          </div>
      
          <SongRecModal modal={modal} toggleModal={toggleModal} trackList={trackList} fetchingTracks={fetching} fetchMoreTracks={fetchResults}/>
          
          <footer className="bg-green-500 text-white py-6 text-center">
            <p className="text-lg">Enjoy Your Music Journey! 🎧</p>
          </footer>
        </div>
      )
      
}

export default SongRecommendation