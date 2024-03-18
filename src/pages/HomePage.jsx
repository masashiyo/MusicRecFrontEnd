import React from 'react';

function HomePage() {

  const handleSpotifyAPIOAuth = () => {
    fetch("http://localhost:8080/auth/login")
    .then((response) => response.text())
    .then(response => {
      window.location.replace(response)
    })
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <header className="text-center">
        <h1 className='text-6xl font-bold mb-8'>Spotify Music Tracking App</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded duration-300 ease-in-out" onClick={handleSpotifyAPIOAuth}>Log in to Spotify</button>
      </header>
    </div>
  );
}

export default HomePage;
