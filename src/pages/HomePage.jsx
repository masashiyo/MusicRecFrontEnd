import React from "react"
import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"

export default function HomePage() {


    return (
        <>
          <NavigationBar />
          <div className="min-h-screen bg-green-500 text-white p-8 flex flex-col items-center justify-center font-semibold">
            <div className="max-w-4xl text-center">
              <h1 className="text-4xl font-bold mb-8">Explore the Music App</h1>
              <p className="text-lg mb-12">
                Welcome! This app implements multiple features from Spotify's API <br/> to create a great experience for any music lover.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Link to="/songRecommendation" className="bg-gray-900 p-8 rounded-lg shadow-md text-center hover:scale-105 transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-4">Discover New Music</h2>
                  <p className="text-lg">Type in music you enjoy and find great recommendations.</p>
                </Link>
                <Link to="/topSongsAndArtists" className="bg-gray-900 p-8 rounded-lg shadow-md text-center hover:scale-105 transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-4">Find your Top Songs and Artists</h2>
                  <p className="text-lg">Find your favorite artists and songs you are listening to.</p>
                </Link>
                <Link to="/home" className="bg-gray-900 p-8 rounded-lg shadow-md text-center hover:scale-105 transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-4">Find Duplicate Songs in your Playlists</h2>
                  <p className="text-lg">Clean up your playlsits by removing duplicate songs on every playlist you have.</p>
                </Link>
                <Link to="/heardle" className="bg-gray-900 p-8 rounded-lg shadow-md text-center hover:scale-105 transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-4">Play a Music Guessing Game</h2>
                  <p className="text-lg">Choose a public playlist and play a guessing game similar to New York Times' famous game, Wordle.</p>
                </Link>
              </div>
            </div>
          </div>
          <Footer/>
        </>
      );
}