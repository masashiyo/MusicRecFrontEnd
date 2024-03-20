import React, { useState, useEffect } from 'react';
import SongSearchBar from '../components/SongSearchBar';

const SongRecommendation = () => {

    
    return(
        <>
            <div className='text-2xl bg-green-500 p-10 mb-20'>
                <h1 className='text-6xl text-center mb-10 mt-10 font-bold'>Song Recommendations</h1>
            </div>
            <SongSearchBar/>
        </>
        
    )
}

export default SongRecommendation