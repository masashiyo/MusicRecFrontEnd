import React, {useState, useEffect} from "react";

const SearchResultTile = (props) => {
    const [artistString, setArtistString] = useState('');

    useEffect(() => {
        const artistNames = props.track.artists.map(artist => artist.name);
        const artistString = artistNames.join(', ');
        setArtistString(artistString);
    }, [props]);
    


    return (
  <div onClick={() => props.handleTrackClick(props.track)} className="overflow-x-hidden ml-10 bg-white py-3 px-6 block text-2xl w-full rounded-lg hover:bg-blue-200 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
    <span className="text-gray-800">{props.track.name} - {artistString}</span>
  </div>
    )
}

export default SearchResultTile