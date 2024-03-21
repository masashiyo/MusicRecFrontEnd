import React, { useState, useEffect } from 'react';
import SongSearchBar from '../components/SongSearchBar';

const SongRecommendation = () => {

    
    return(
        <>
            <div className='text-2xl bg-green-500 p-10 mb-20'>
                <h1 className='text-6xl text-center mb-10 mt-10 font-bold'>Song Recommendations</h1>
                {/* <button className="transition duration-300 ease-in-out hover:bg-green-700 p-3 rounded-lg border border-white">Get Artists</button> */}
            </div>
            <SongSearchBar/>
        </>
        
    )
}

export default SongRecommendation