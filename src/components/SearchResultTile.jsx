import React, {useState, useEffect} from "react";

const SearchResultTile = (props) => {
    const { track , handleTrackClick } = props
    const [artistString, setArtistString] = useState('');

    useEffect(() => {
        const artistNames = props.track.artists.map(artist => artist.name);
        const artistString = artistNames.join(', ');
        setArtistString(artistString);
    }, [props]);
    


    return (
        <div className="bg-white py-3 block text-3xl w-full border-transparent hover:border-blue-500 hover:bg-blue-50 cursor-pointer">
            <span onClick={() => props.handleTrackClick(props.track)}>{props.track.name} - {artistString}</span>
        </div>
    )
}

export default SearchResultTile