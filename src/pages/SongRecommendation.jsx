import React, { useState, useEffect } from 'react';
import SongSearchBar from '../components/SongSearchBar';

const SongRecommendation = () => {

    
    return(
        <div className='text-3xl font-bold mt-5'>
            <h1>Song Recommendations</h1>
            <SongSearchBar/>
        </div>
    )
}

export default SongRecommendation