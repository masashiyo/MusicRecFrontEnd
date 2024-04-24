import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from 'react-icons/fa';

const PlayButton = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    let progressInterval;
  
    const togglePlay = () => {
      setIsPlaying(prevState => !prevState);
    };
  
    useEffect(() => {
      if (isPlaying) {
        progressInterval = setInterval(() => {
          if (progress >= 100) {
            clearInterval(progressInterval);
            setIsPlaying(false);
          } else {
            setProgress(prevProgress => prevProgress + 1);
          }
        }, 100);
      } else {
        clearInterval(progressInterval);
      }
  
      return () => clearInterval(progressInterval);
    }, [isPlaying, progress]);
  
    return (
      <div className="flex flex-col items-center justify-center my-8">
        <button
          onClick={togglePlay}
          className="flex items-center justify-center p-5 bg-green-500 text-white rounded-full shadow-md hover:bg-green-400 transition duration-300 transform hover:scale-105"
        >
          {isPlaying ? <FaPause /> : <FaPlay />} {/* Use icons for play and pause */}
        </button>
        <div className="w-80 h-3 bg-gray-300 mt-3 rounded-full">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };
  
  export default PlayButton;