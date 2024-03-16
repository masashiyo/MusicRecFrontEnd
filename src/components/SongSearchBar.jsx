import React, { useState, useEffect, useRef } from 'react';
import SearchResultTile from './SearchResultTile';

const SongSearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState(['something','test','test2','test523']);
    const [rawSearchResults, setRawSearchResults] = useState(['something','test','test2','test523']);
    const timeoutRef = useRef(null);


    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };
    
    useEffect(() => {
        clearTimeout(timeoutRef.current);

        // Set new timeout
        timeoutRef.current = setTimeout(() => {
            if (searchValue.trim() !== '') {
                fetchResults(searchValue);
            } else {
                setRawSearchResults([]);
            }
        }, 700);
    },[searchValue])

    const fetchResults = async (value) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  query: searchValue,
                })
              };
            const response = await fetch(`http://localhost:8080/auth/songSearch`,requestOptions);
            const data = await response.json();

            setRawSearchResults(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // useEffect(() => {
    //     const formattedSearchResults = rawSearchResults.map((result) => {
    //         return <SearchResultTile key={result.id} result={result} />
    //       })
    //       setSearchResults(formattedSearchResults)
    // },[rawSearchResults])
    

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={handleChange}
            />
            <ul className="search-results">
            </ul>
        </div>
    );
}

export default SongSearchBar