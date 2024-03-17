import React, {useState, useEffect} from "react";

const SearchResultTile = () => {
    const { track } = props
    return (
        <div>{props.track.name}</div>
    )
}

export default SearchResultTile