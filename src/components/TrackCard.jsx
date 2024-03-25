import React, { useEffect } from 'react';

const TrackCard = (props) => {
  const { artist } = props;
  const artistNames = props.track.artists.map(artist => artist.name).join(', ');

  useEffect(() => {
    let vid = document.getElementById(`audioPlayer${props.track.id}`)
    if(vid)
      vid.volume = 0.1;
  })

  return (
    <div className="flex justify-center color-black border-2 border-[#ccc] rounded-lg mb-10 p-5 w-[80%]">
      <a href={props.track.externalUrls.externalUrls.spotify} target="_blank" className='w-24 h-24 mr-10'>
        <img src={props.track.album.images[0].url} alt={props.track.name} className="w-24 h-24 mr-20" />
      </a>
      <div className="grow">
        <h3 className="m-0 text-2xl">{props.track.name}</h3>
        <p className="mt-5 text-lg" >Artist: {artistNames}</p>
        <p className="text-lg">Album: {props.track.album.name}</p>
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
