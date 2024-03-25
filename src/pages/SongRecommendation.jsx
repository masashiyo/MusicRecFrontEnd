import React, { useState, useEffect } from 'react';
import SongSearchBar from '../components/SongSearchBar';
import SongRecModal from '../components/SongRecModal';

const SongRecommendation = () => {
    const [tracksSelected, setTracksSelected] = useState([]);
    const [modal, setModal] = useState(false);
    const [trackList, setTrackList] = useState([]);

    const sendTrackToParent = (tracks) => {
        setTracksSelected(tracks);
    }

    const toggleModal = () => {
        setModal(!modal)
    }

    const createTrackPayload = (tracks) => {
        const trackIds = tracks.map(track => track.id);
        return trackIds.join(",");
    }

    const fetchResults = async () => {
        if(tracksSelected.length < 1)
            return;
        let trackPayload = createTrackPayload(tracksSelected)
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  limit: 5,
                  tracks: trackPayload
                })
              };
            const response = await fetch(`http://localhost:8080/auth/songRecs`,requestOptions);
            const data = await response.json();
            
            setTrackList(data)
            toggleModal()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    return(
        <div className=''>
            <div className='bg-green-500 text-white py-6 mb-10 flex flex-col items-center'>
                <h1 className='text-5xl mb-20 mt-6'>Song Recommendations</h1>
            </div>
            <SongSearchBar sendTrackToParent={sendTrackToParent} />
            <div className='flex justify-center'>
                {tracksSelected.length > 0 ? <button onClick={() => fetchResults()} className="mb-20 transition duration-300 ease-in-out text-white bg-green-500 hover:bg-green-700 p-2 text-xl rounded-lg border border-white">Get Tracks</button> : ''}
            </div>
            <SongRecModal modal={modal} toggleModal={toggleModal} trackList={trackList}/>
        </div>
        
    )
}

export default SongRecommendation