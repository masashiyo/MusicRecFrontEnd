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

    return (
        <>
          {props.modal &&
            <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg w-4/5 md:w-[70%] h-4/5 md:h-[80%] overflow-y-auto relative">
                <button className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300" onClick={() => props.toggleModal()}>Close</button>
                <h2 className="text-5xl mb-12 mt-8 text-center text-green-500 font-semibold">Recommended Songs</h2>
                <div className="flex flex-col items-center w-[70%] mx-auto">
                  {mappedTracks.length > 0 && mappedTracks}
                </div>
                <p className="text-3xl text-center mt-8 mb-4 text-gray-700">{props.fetchingTracks && "Loading..."}</p>
                {!props.fetchingTracks &&
                  <button className="flex mx-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 transform hover:scale-105 mb-10" onClick={() => props.fetchMoreTracks()}> Get More Recommendations</button>
                }
              </div>
            </div>
          }
        </>
      );
      
      
}