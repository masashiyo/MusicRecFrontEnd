import React from 'react';

function HomePage() {

  const handleSpotifyAPIOAuth = () => {
    fetch("http://localhost:8080/api/login")
    .then((response) => response.text())
    .then(response => {
      window.location.replace(response)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Log in to Spotify Page</h1>
        <button className="button" onClick={handleSpotifyAPIOAuth}>Log in to Spotify</button>
      </header>
    </div>
  );
}

export default HomePage;
