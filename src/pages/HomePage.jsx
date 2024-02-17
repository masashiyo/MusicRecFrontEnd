import React from 'react';

function HomePage() {

  const handleSpotifyLogIn = () => {
    const clientId = '5f49d819d085489a833b8f0ad63886e5';
    const redirectUri = 'http://localhost:5173/redirect';
    const scope = 'user-read-private user-read-email';

    const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}&response_type=code`;

    // Redirect the user to the Spotify authorization URL
    window.location.href = authorizationUrl;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Log in to Spotify Page</h1>
        <button onClick={handleSpotifyLogIn}>Log in to Spotify</button>
      </header>
    </div>
  );
}

export default HomePage;
