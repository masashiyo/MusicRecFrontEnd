import React, { useState, useEffect, useRef } from 'react';
import SearchResultTile from './SearchResultTile';

const SongSearchBar = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [rawSearchResults, setRawSearchResults] = useState([]);
    const timeoutRef = useRef(null);

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleTrackClick = (track) => {
        let tempTrackList = props.tracksSelected
        if(!tempTrackList.some((trackItem) => trackItem.id === track.id) && tempTrackList.length < 5) {
            tempTrackList.push(track)
            props.sendTrackToParent(tempTrackList)
            setSearchValue('')
            setSearchResults('')
        }
    }

    const fetchResults = async (value) => {
        try {
            const url = `http://localhost:8080/api/songSearch?query=${value}`;
            const response = await fetch(url, { credentials: 'include' });
            setRawSearchResults(await response.json());
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

    const filterDuplicateTracks = (searchResults, tracksSelected) => {
      const searchResultsIds = tracksSelected.map(item => item.id);
      return searchResults.filter(item => !searchResultsIds.includes(item.id));
    }

    useEffect(() => {
      let filteredSearchResults = filterDuplicateTracks(rawSearchResults, props.tracksSelected)
        const formattedSearchResults = filteredSearchResults.slice(0,10).map((result, index) => {
          return <SearchResultTile handleTrackClick={handleTrackClick} track={result} key={index}/>
        })
        if(formattedSearchResults.length > 0) {
          setSearchResults(formattedSearchResults)
        }
    },[rawSearchResults])
    

    return (
        <>
          <div className='text-left w-8/12 mx-auto relative'>
            <input
              className='rounded-lg text-5xl border border-[#ccc] w-full py-3 px-4 focus:border-green-500'
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={handleChange}
            />
            <div className='absolute bg-white rounded-lg mt-2 w-full max-h-60 overflow-y-auto z-10'>
              {searchResults.length > 0 &&
                <ul className="overflow-x-hidden">
                  {searchResults.map((result, index) => (
                    <li key={index}>
                      <p className="text-lg">{result}</p>
                    </li>
                  ))}
                </ul>
              }
            </div>
          </div>
        </>
      );
      
}

export default SongSearchBar