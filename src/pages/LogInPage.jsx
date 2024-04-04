import React from 'react';

function LogInPage() {

  const handleSpotifyAPIOAuth = () => {
    fetch("http://localhost:8080/auth/login")
    .then((response) => response.text())
    .then(response => {
      window.location.replace(response)
    })
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Welcome to My Spotify App</h1>
        <p className="text-lg text-gray-700 mb-8">Discover new music, see top songs and artists, and enjoy personalized recommendations.</p>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300" onClick={handleSpotifyAPIOAuth}>Get Started</button>
      </div>
    </div>
  );
}

export default LogInPage;
