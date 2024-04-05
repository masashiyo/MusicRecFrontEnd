import React, { useEffect } from 'react';

const TrackCard = (props) => {
  const artistNames = props.track.artists.map(artist => artist.name).join(', ');

  useEffect(() => {
    const audio = document.getElementById(`audioPlayer${props.track.id}`);
    if (audio) {
      audio.volume = 0.1;
      audio.onplay = () => pauseOtherTracks(props.track.id);
      audio.onended = () => resetAudio();
      audio.onpause = () => resetAudio();
    }
  }, [props.track.id]);

  const pauseOtherTracks = (currentTrackId) => {
    const audioElements = document.getElementsByTagName('audio');
    for (let audio of audioElements) {
      const id = audio.id.replace('audioPlayer', '');
      if (id !== currentTrackId && !audio.paused) {
        audio.pause();
      }
    }
  };

  const resetAudio = () => {
    const audio = document.getElementById(`audioPlayer${props.track.id}`);
    if (audio) {
      audio.currentTime = 0;
    }
  };

  return (
    <div className="flex items-center justify-center bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300 w-full mb-2">
      <a href={props.track.externalUrls.externalUrls.spotify} target="_blank" className='w-24 h-24 mr-6 flex-shrink-0'>
        <img src={props.track.album.images[0].url} alt={props.track.name} className="w-full h-full" />
      </a>
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{props.track.name}</h3>
        <p className="text-gray-600 text-base mb-1" >Artist: {artistNames}</p>
        <p className="text-gray-600 text-base">Album: {props.track.album.name}</p>
      </div>
      {props.previewMusic && props.track.previewUrl &&
        <div>
          <audio controls src={props.track.previewUrl} id={`audioPlayer${props.track.id}`}/>
        </div>
      }
    </div>
  );
};

export default TrackCard;
