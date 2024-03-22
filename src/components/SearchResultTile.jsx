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
        <div onClick={() => props.handleTrackClick(props.track)} className="bg-white py-3 block text-3xl w-full border-transparent hover:bg-blue-200 cursor-pointer">
            <span>{props.track.name} - {artistString}</span>
        </div>
    )
}

export default SearchResultTile