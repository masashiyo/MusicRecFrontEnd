import React, { useState, useEffect } from "react";
import TrackCard from "./TrackCard";

export default function SongRecModal(props) {
    const [mappedTracks, setMappedTracks] = useState([]);

    useEffect(() => {
        const trackData = props.trackList.map((track) => {
            return <TrackCard key={track.id} track={track} previewMusic={true}/>
          })
          setMappedTracks(trackData)
    },[props.trackList])

    return(
        <>
            {props.modal &&
                <div className="w-[100%] h-[100%] top-0 left-0 right-0 bottom-0 fixed z-10 bg-gray-900 bg-opacity-50">
                    <div className="bg-white z-50 mx-auto w-[70%] h-[80%] my-[5%] overflow-y-scroll">
                        <button className="mt-2 ml-2 absolute mb-20 transition duration-300 ease-in-out text-white bg-green-500 hover:bg-green-700 p-2 text-xl rounded-lg border border-white" onClick={() => props.toggleModal()}>Close</button>
                        <h2 className="text-5xl mb-24 text-center p-24 bg-green-500 text-white">Recommended Songs</h2>
                        <div className="flex flex-col items-center">
                            {mappedTracks.length > 0 && mappedTracks}
                        </div>
                        <span className="text-5xl flex justify-center text-center mx-auto">{props.fetchingTracks && "Loading..."}</span>
                        {!props.fetchingTracks &&
                            <button className="flex mx-auto my-8 transition duration-300 ease-in-out text-white bg-green-500 hover:bg-green-700 p-2 text-xl rounded-lg border border-white" onClick={() => props.fetchMoreTracks()}> Get More Recommendations</button>}
                    </div>
                </div>
            }
        </>
    )
}