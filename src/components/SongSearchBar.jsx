import React, { useState, useEffect, useRef } from 'react';
import SearchResultTile from './SearchResultTile';
import TrackCard from './TrackCard';

const SongSearchBar = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [rawSearchResults, setRawSearchResults] = useState([]);
    const timeoutRef = useRef(null);
    const[trackList, setTrackList] = useState([]);
    const[mappedTracks, setMappedTracks] = useState()

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleTrackClick = (track) => {
        let tempTrackList = trackList;
        if(!tempTrackList.some((trackItem) => trackItem.id === track.id) && tempTrackList.length < 5) {
            tempTrackList.push(track)
            props.sendTrackToParent(tempTrackList)
            setTrackList(tempTrackList)
            setSearchValue('')
            setSearchResults('')
            if(trackList.length > 0) {
                const trackData = trackList.map((track) => {
                  return <TrackCard key={track.id} track={track} />
                })
                setMappedTracks(trackData)
            }
        }
    }

    const fetchResults = async (value) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  query: value,
                })
              };
            const response = await fetch(`http://localhost:8080/auth/songSearch`,requestOptions);
            const data = await response.json();

            setRawSearchResults(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            if (searchValue.trim() !== '') {
                fetchResults(searchValue);
            } else {
                setRawSearchResults([]);
                setSearchResults([]);
            }
        }, 500);
    },[searchValue])

    useEffect(() => {
        const formattedSearchResults = rawSearchResults.map((result) => {
            return <SearchResultTile handleTrackClick={handleTrackClick} track={result}/>
          })
          if(formattedSearchResults.length > 0) {
            setSearchResults(formattedSearchResults)
          }
    },[rawSearchResults])
    

    return (
        <>
            <div className='text-left w-8/12 mx-auto'>
                <input
                className='rounded-lg text-5xl border border-[#ccc] w-full'
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={handleChange}
                />
            <div className='absolute w-8/12'>
                {searchResults.length > 0 && searchResults}
            </div>
            </div>
            <div className='mt-20 w-[83.5%] mx-auto flex flex-col items-center'>
                {mappedTracks}
            </div>
        </>

    );
}

export default SongSearchBar