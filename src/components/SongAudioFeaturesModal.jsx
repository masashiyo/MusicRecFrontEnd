import React, { useState, useEffect } from "react";
import SongFeature from "./SongFeature";

export default function SongAudioFeaturesModal(props) {
  const [buttonName, setButtonName] = useState("Skip Song Features and Get Tracks");
  const [mappedFeatures, setMappedFeatures] = useState([])

  useEffect(() => {
    if(props.songFeaturesSelected.length === 0)
      setButtonName("Skip Song Features and Get Tracks")
    else 
      setButtonName("Get Tracks using Song Features")
  },[props.songFeaturesSelected])

  useEffect(() => {
    mapFeaturesToCard(props.songFeatures)
  })

  const mapFeaturesToCard = (features) => {
    if(props.songFeatures.length > 0) {
      const featureData = features.map((feature, index) => {
        return <SongFeature feature={feature} key={index} sendFeatureToParent={props.sendFeatureToParent}/>
      })
      setMappedFeatures(featureData)
    }
  }

    return (
        <>
          {props.modal &&
            <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg w-4/5 md:w-[70%] h-4/5 md:h-[80%] overflow-y-auto relative">
                <button className="absolute top-2 right-2 bg-green-500 hover:bg-red-500 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-200" onClick={() => props.toggleModal()}>Close</button>
                <h2 className="text-5xl mb-12 mt-8 text-center text-green-500 font-semibold">Common Song Features</h2>
                <p className="text-xl text-center text-green-500">These are the common song features found. You can select up to two different common features to modify your recommendations.</p>
                <div className="flex flex-col items-center w-[70%] mx-auto">
                  {mappedFeatures.length > 0 && mappedFeatures}
                </div>
                <p className="text-3xl text-center mt-8 mb-4 text-gray-700">{props.fetchingTracks && "Loading..."}</p>
                {!props.fetchingTracks &&
                  <button className="flex mx-auto bg-green-500 hover:bg-green-400 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 transform hover:scale-105 mb-10" onClick={() => props.fetchSongRecs()}> {buttonName}</button>
                }
              </div>
            </div>
          }
        </>
      );
      
      
}