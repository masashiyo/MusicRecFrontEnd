import React from 'react';

const ArtistCard = (props) => {
  const formattedGenres = props.artist.genres.length > 0 ? formatGenres(props.artist.genres) : 'N/A';

  function formatGenres(genres) {
    return genres.map(genre => genre.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join(', ');
  }


  return (
    <div className="flex items-center justify-center bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300 w-full mb-2">
      <a href={props.artist.externalUrls.externalUrls.spotify} target="_blank" rel="noopener noreferrer" className="w-24 h-24 mr-6 flex-shrink-0">
        <img src={props.artist.images[0].url} alt={props.artist.name} className="w-full h-full" />
      </a>
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{props.artist.name}</h3>
        <p className="text-gray-600 text-base mb-1">Genre: {formattedGenres}</p>
        <p className="text-gray-600 text-base">Popularity: {props.artist.popularity}</p>
      </div>
    </div>
  );
};

export default ArtistCard;
