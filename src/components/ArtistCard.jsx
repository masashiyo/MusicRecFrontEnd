import React from 'react';

const ArtistCard = (props) => {
  const { artist } = props;
  const formattedGenres = artist.genres.length > 0 ? formatGenres(artist.genres) : 'N/A';

  function formatGenres(genres) {
    return genres.map(genre => genre.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join(', ');
  }

  return (
    <div className="artist-card">
      <a href={props.artist.externalUrls.externalUrls.spotify} target="_blank">
        <img src={props.artist.images[0].url} alt={props.artist.name} className="artist-image" />
      </a>
      <div className="artist-details">
        <h3 className="artist-name">{props.artist.name}</h3>
        <p className="artist-genre" >Genre: {formattedGenres}</p>
        <p className="artist-popularity">Popularity: {props.artist.popularity}</p>
      </div>
    </div>
  );
};

export default ArtistCard;
