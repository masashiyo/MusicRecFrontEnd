import React, { useState, useEffect, useContext } from 'react';
import SongSearchBar from '../components/SongSearchBar';
import SongRecModal from '../components/SongRecModal';
import TrackCard from '../components/TrackCard';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import SongAudioFeaturesModal from '../components/SongAudioFeaturesModal';

const SongRecommendation = () => {
    const [tracksSelected, setTracksSelected] = useState([]);
    const [mappedTracks, setMappedTracks] = useState([])
    const [songRecModal, setSongRecModal] = useState(false);
    const [songAudioFeaturesModal, setSongAudioFeaturesModal] = useState(false);
    const [songFeatures, setSongFeatures] = useState([])
    const [songFeaturesSelected, setSongFeaturesSelected] = useState([]);
    const [trackList, setTrackList] = useState([]);
    const [fetching, setFetching] = useState(false)

    const sendTrackToParent = (tracks) => {
        setTracksSelected(tracks);
        mapTracksToCard(tracks)
    }

    const sendFeatureToParent = (feature) => {
      setSongFeaturesSelected(prevFeatures => {
        const tempSongFeatures = [...prevFeatures]; // Create a copy of the previous state array
    
        // Check if the feature is already selected
        const existingIndex = tempSongFeatures.findIndex(item => item.category === feature.category);
      
        // If the feature is already selected, remove it
        if(existingIndex !== -1) {
          tempSongFeatures.splice(existingIndex, 1);
        } else {
          // If the feature is not selected, add it
          tempSongFeatures.push(feature);
        }
      
        return tempSongFeatures;
      });
    }
    

    const toggleSongRecModal = () => {
      setSongFeaturesSelected([])
      setSongFeatures([])
      setSongRecModal(!songRecModal)
    }

    const toggleSongAudioFeaturesModal = () => {
      setSongFeaturesSelected([])
      setSongFeatures([])
      setSongAudioFeaturesModal(!songAudioFeaturesModal)
    }

    const createTrackStringPayload = (tracks) => {
        const trackIds = tracks.map(track => track.id);
        return trackIds.join(",");
    }

    const clearSelectedTracks = () => {
        setTracksSelected([]);
        setMappedTracks([])
    }

    const fetchSongRecs = async () => {
        if(tracksSelected.length < 1)
            return;
        let trackPayload = createTrackStringPayload(tracksSelected)
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
                  tracks: trackPayload,
                  limit: 50,
                  audioFeaturesList: songFeaturesSelected,
                })
              };
            const response = await fetch(`http://localhost:8080/api/songRecs`,requestOptions);
            const data = await response.json();
            setFetching(false)
            setSongAudioFeaturesModal(false)
            setTrackList(data)
            setSongRecModal(true)
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchCommonSongFeatures = async () => {
      if(tracksSelected.length < 1)
        return;
      let trackPayload = createTrackStringPayload(tracksSelected)
      try {
          setFetching(true)
          const response = await fetch(`http://localhost:8080/api/songCommonAudioFeatures?tracks=${trackPayload}`, { credentials: 'include' });
          const data = await response.json();
          setSongAudioFeaturesModal(true)
          setFetching(false)
          setSongFeatures(data)
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    }

    const mapTracksToCard = (tracks) => {
        if(tracks.length > 0) {
            const trackData = tracks.map((track) => {
              return <TrackCard key={track.id} track={track} previewMusic={true}/>
            })
            setMappedTracks(trackData)
        }
    }
    
    return (
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <NavigationBar />
            <div className="bg-green-500 text-white py-12 mb-10 flex flex-col items-center">
              <h1 className="text-6xl mb-20 mt-6 font-semibold">Song Recommendations</h1>
            </div>
            <SongSearchBar sendTrackToParent={sendTrackToParent} tracksSelected={tracksSelected}/>
            <div className="flex justify-center">
              <div className="mt-20 w-[50%] mx-auto flex flex-col items-center">
                {mappedTracks}
              </div>
            </div>
            <div className="flex justify-center my-12">
              {tracksSelected.length > 0 &&
                <button onClick={() => clearSelectedTracks()} className="bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 transform hover:scale-105">Clear All</button>
              }
              {tracksSelected.length > 0 && 
                <button onClick={() => fetchCommonSongFeatures()} className="bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 ml-5 transform hover:scale-105">Get Tracks</button>
              }
            </div>
          </div>
          <SongAudioFeaturesModal modal={songAudioFeaturesModal} toggleModal={toggleSongAudioFeaturesModal} fetching={fetching} sendFeatureToParent={sendFeatureToParent} songFeaturesSelected={songFeaturesSelected} songFeatures={songFeatures} trackList={trackList} fetchSongRecs={fetchSongRecs}/>
          <SongRecModal modal={songRecModal} toggleModal={toggleSongRecModal} trackList={trackList} fetchingTracks={fetching} fetchMoreTracks={fetchSongRecs}/>
          <Footer/>
        </div>
      )
}

export default SongRecommendation