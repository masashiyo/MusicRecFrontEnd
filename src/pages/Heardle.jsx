
import React, { useState, useEffect } from "react"
import Footer from "../components/Footer"
import NavigationBar from "../components/NavigationBar"
import SongSearchBar from "../components/SongSearchBar"
import TrackCard from "../components/TrackCard"
import PlayButton from "../components/PlayButton"

export default function Heardle() {
    const [tracksSelected, setTracksSelected] = useState([]);
    const [currentTrack, setCurrentTrack] = useState({
        "album": {
          "albumGroup": null,
          "albumType": "ALBUM",
          "artists": [
            {
              "externalUrls": {
                "externalUrls": {
                  "spotify": "https://open.spotify.com/artist/5JZ7CnR6gTvEMKX4g70Amv"
                }
              },
              "href": "https://api.spotify.com/v1/artists/5JZ7CnR6gTvEMKX4g70Amv",
              "id": "5JZ7CnR6gTvEMKX4g70Amv",
              "name": "Lauv",
              "type": "ARTIST",
              "uri": "spotify:artist:5JZ7CnR6gTvEMKX4g70Amv"
            }
          ],
          "externalUrls": {
            "externalUrls": {
              "spotify": "https://open.spotify.com/album/71cQY3dUThCY6vVKaUIXqR"
            }
          },
          "href": "https://api.spotify.com/v1/albums/71cQY3dUThCY6vVKaUIXqR",
          "id": "71cQY3dUThCY6vVKaUIXqR",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/ab67616d0000b273bdea30b86b37142ec99deb78",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/ab67616d00001e02bdea30b86b37142ec99deb78",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/ab67616d00004851bdea30b86b37142ec99deb78",
              "width": 64
            }
          ],
          "name": "I met you when I was 18. (the playlist)",
          "releaseDate": "2018-05-31",
          "releaseDatePrecision": "DAY",
          "restrictions": null,
          "type": "ALBUM",
          "uri": "spotify:album:71cQY3dUThCY6vVKaUIXqR"
        },
        "artists": [
          {
            "externalUrls": {
              "externalUrls": {
                "spotify": "https://open.spotify.com/artist/5JZ7CnR6gTvEMKX4g70Amv"
              }
            },
            "href": "https://api.spotify.com/v1/artists/5JZ7CnR6gTvEMKX4g70Amv",
            "id": "5JZ7CnR6gTvEMKX4g70Amv",
            "name": "Lauv",
            "type": "ARTIST",
            "uri": "spotify:artist:5JZ7CnR6gTvEMKX4g70Amv"
          }
        ],
        "discNumber": 1,
        "durationMs": 197436,
        "externalIds": {
          "externalIds": {
            "isrc": "GBWWP1702907"
          }
        },
        "externalUrls": {
          "externalUrls": {
            "spotify": "https://open.spotify.com/track/0EcQcdcbQeVJn9fknj44Be"
          }
        },
        "href": "https://api.spotify.com/v1/tracks/0EcQcdcbQeVJn9fknj44Be",
        "id": "0EcQcdcbQeVJn9fknj44Be",
        "isPlayable": null,
        "linkedFrom": null,
        "restrictions": null,
        "name": "I Like Me Better",
        "popularity": 82,
        "previewUrl": "https://p.scdn.co/mp3-preview/57bf51d254e2e01819ec8e013f4ed1c1fff8e50e?cid=5f49d819d085489a833b8f0ad63886e5",
        "trackNumber": 1,
        "type": "TRACK",
        "uri": "spotify:track:0EcQcdcbQeVJn9fknj44Be",
        "isExplicit": false
      });
    const [trackGuessing, setTrackGuessing] = useState([]);
    const [guessesLeft, setGuessesLeft] = useState(5);

    const sendTrackToParent = (tracks) => {
        let tempTracks = [...tracks];
        setTracksSelected([]);
        let popped = tempTracks.pop();
        mapGuessingTrack(popped);
    }

    const mapGuessingTrack = (track) => {
        setTrackGuessing(
            <TrackCard track={track} previewMusic={false} displayClose={true} removeTrackCard={removeTrackCard}/>
        );
    }

    const removeTrackCard = () => {
        setTracksSelected([]);
        setTrackGuessing([])
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
            <PlayButton track={currentTrack}/>
            <SongSearchBar tracksSelected={tracksSelected} sendTrackToParent={sendTrackToParent} />
            <div className="w-[40%] mt-12">
                {trackGuessing}
            </div>
            <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 rounded mt-12 rounded-full shadow-md transition duration-300 transform hover:scale-105 mt-12">
                Submit Guess
            </button>
        </div>
        <Footer />
      </div>
    )
}