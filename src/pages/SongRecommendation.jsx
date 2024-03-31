import React, { useState, useEffect } from 'react';
import SongSearchBar from '../components/SongSearchBar';
import SongRecModal from '../components/SongRecModal';
import TrackCard from '../components/TrackCard';

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
                headers: { 
                    'Content-Type': 'application/json' ,
                    'credentials': 'include' //include the cookies
                    // 'Cookie': 'authToken=BQAzd99c3c8NhxPiKMbb2505V8JvM9Gh-xc0ZinrHhW22a3v_6IVIMBxYcAUsz7N8KHGwA1G_KAhBGRHD68G5EfsR-GvOltep0z1M5W44wGsTeT1M8kByYIZxNYjVxWIIxUS9c5oXoJgpOSt5xhLzICzMlIhkTWaF8naXZJ9ARarldYzDb_BqlGPGnngKmLY0wA'
                },
                body: JSON.stringify({
                  limit: 10,
                  tracks: trackPayload
                })
              };
            const response = await fetch(`http://localhost:8080/auth/songRecs`,requestOptions);
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
    
    return(
        <div className=''>
            <div className='bg-green-500 text-white py-6 mb-10 flex flex-col items-center'>
                <h1 className='text-5xl mb-20 mt-6'>Song Recommendations</h1>
            </div>
            <SongSearchBar sendTrackToParent={sendTrackToParent} tracksSelected={tracksSelected}/>
            <div className='flex justify-center'>
                <div className='mt-20 w-[83.5%] mx-auto flex flex-col items-center'>
                    {mappedTracks}
                </div>
            </div>
            <div className='flex justify-center'>
                {tracksSelected.length > 0 &&
                    <button onClick={() => clearSelectedTracks()} className="mb-20 transition duration-300 ease-in-out text-white bg-green-500 hover:bg-green-700 p-2 text-xl rounded-lg border border-white">Clear All</button>
                }
                {tracksSelected.length > 0 && 
                    <button onClick={() => fetchResults()} className="mb-20 transition duration-300 ease-in-out text-white bg-green-500 hover:bg-green-700 p-2 text-xl rounded-lg border border-white">Get Tracks</button>
                }
            </div>

            <SongRecModal modal={modal} toggleModal={toggleModal} trackList={trackList} fetchingTracks={fetching} fetchMoreTracks={fetchResults}/>
        </div>
        
    )
}

export default SongRecommendation