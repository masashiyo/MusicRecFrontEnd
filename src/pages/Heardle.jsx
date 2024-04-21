
import React, { useState, useEffect } from "react"
import Footer from "../components/Footer"
import NavigationBar from "../components/NavigationBar"
import SongSearchBar from "../components/SongSearchBar"

export default function Heardle() {
    return (
        <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <div className="flex-grow bg-white p-8 rounded-lg shadow-md max-w-sm w-full pt-24">
          <h1 className="text-3xl mb-4 font-bold text-center text-blue-500">Heardle</h1>
          <p className="mb-4 text-center">Guess the song title!</p>
          <div className="flex flex-col items-center mb-4">
            <SongSearchBar tracksSelected={[]} />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">
              Submit Guess
            </button>
          </div>
          <p className="text-lg font-bold mt-4 text-center">Clue: _______</p>
          <p className="text-green-600 font-semibold mt-2 text-center">Feedback will appear here.</p>
        </div>
        <Footer />
      </div>


    )
}