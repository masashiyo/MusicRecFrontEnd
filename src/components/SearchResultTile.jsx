import React, {useState, useEffect} from "react";

const SearchResultTile = (props) => {
    const { track } = props
    const [artistString, setArtistString] = useState('');
    let artistArray = []

    useEffect(() => {
        const artistNames = props.track.artists.map(artist => artist.name);
        const artistString = artistNames.join(', ');
        setArtistString(artistString);
    }, [props]);
    


    return (
        <div>
            <span>{props.track.name} - {artistString}</span>
        </div>
    )
}

export default SearchResultTile