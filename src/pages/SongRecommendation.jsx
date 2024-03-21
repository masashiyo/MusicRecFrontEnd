import React, { useState, useEffect } from 'react';
import SongSearchBar from '../components/SongSearchBar';

const SongRecommendation = () => {
    const [tracksSelected, setTracksSelected] = useState([]);

    const sendTrackToParent = (tracks) => {
        setTracksSelected(tracks);
    }

    
    return(
        <div className=''>
            <div className='text-2xl bg-green-500 p-10 mb-20'>
                <h1 className='text-6xl text-center mt-10 font-bold'>Song Recommendations</h1>
            </div>
            <SongSearchBar sendTrackToParent={sendTrackToParent} />
            <div className='flex justify-center'>
                {tracksSelected.length > 0 ? <button className="mb-20 transition duration-300 ease-in-out bg-green-500 hover:bg-green-700 p-5 text-3xl rounded-lg border border-white">Get Tracks</button> : ''}
            </div>
        </div>
        
    )
}

export default SongRecommendation