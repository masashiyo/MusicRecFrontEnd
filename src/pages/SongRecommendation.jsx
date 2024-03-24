import React, { useState, useEffect } from 'react';
import SongSearchBar from '../components/SongSearchBar';

const SongRecommendation = () => {
    const [trackList, setTrackList] = useState([]);

        const fetchTrackRecommendations = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  limit: 5,
                  tracks: "0c6xIDDpzE81m2q797ordA"
                })
              };
            const response = await fetch(`http://localhost:8080/auth/songRecs`,requestOptions);
            const data = await response.json();

            setTrackList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    
    return(
        <>
            <div className='text-2xl bg-green-500 p-10 mb-20'>
                <h1 className='text-6xl text-center mb-10 mt-10 font-bold'>Song Recommendations</h1>
                <button className="transition duration-300 ease-in-out hover:bg-green-700 p-3 rounded-lg border border-white" onClick={() => fetchTrackRecommendations()}>Get Song Recs</button>
            </div>
            <SongSearchBar parentTracks={trackList}/>
        </>
        
    )
}

export default SongRecommendation