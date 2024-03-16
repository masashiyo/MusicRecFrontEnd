import React from 'react';

const TrackCard = (props) => {
  const { artist } = props;
  const artistNames = props.track.artists.map(artist => artist.name).join(', ');

  return (
    <div className="artist-card">
      <a href={props.track.externalUrls.externalUrls.spotify} target="_blank">
        <img src={props.track.album.images[0].url} alt={props.track.name} className="artist-image" />
      </a>
      <div className="artist-details">
        <h3 className="artist-name">{props.track.name}</h3>
        <p className="artist-genre" >Artist: {artistNames}</p>
        <p className="artist-popularity">Album: {props.track.album.name}</p>
      </div>
    </div>
  );
};

export default TrackCard;
