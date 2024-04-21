
import React, { useState, useEffect } from "react"
import Footer from "../components/Footer"
import NavigationBar from "../components/NavigationBar"
import SongSearchBar from "../components/SongSearchBar"
import TrackCard from "../components/TrackCard"

export default function Heardle() {
    const [tracksSelected, setTracksSelected] = useState([]);
    const [currentTrack, setCurrentTrack] = useState([]);
    const [trackGuessing, setTrackGuessing] = useState([]);
    const [guessesLeft, setGuessesLeft] = useState(5);
    const sendTrackToParent = (tracks) => {
        let tempTracks = [...tracks];
        setTracksSelected([])
        let popped = tempTracks.pop();
        setTrackGuessing(popped);
    }


    return (
        <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <div className="bg-green-500 p-8 rounded-lg shadow-md w-full my-12">
          <h1 className="text-6xl mb-4 font-bold text-center text-white">Heardle</h1>
          <p className="mb-4 text-center text-white">Guess the song title!</p>
        </div>
        <div className="flex flex-grow flex-col items-center">
            <div className="text-2xl mb-12">
                Number of Tries Left: {guessesLeft}
            </div>
            <SongSearchBar tracksSelected={tracksSelected} sendTrackToParent={sendTrackToParent} />
            {trackGuessing.length > 0 && trackGuessing.map((result, index) => {
                console.log(result);
                return (<TrackCard track={result} key={index}/>)
            })}
            <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 rounded mt-2 rounded-full shadow-md transition duration-300 transform hover:scale-105 mt-12">
                Submit Guess
            </button>
        </div>
        <Footer />
      </div>
    )
}