import React from 'react';

const ArtistCard = (props) => {
  const formattedGenres = props.artist.genres.length > 0 ? formatGenres(props.artist.genres) : 'N/A';

  function formatGenres(genres) {
    return genres.map(genre => genre.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join(', ');
  }

  return (
    <div className="flex justify-center color-black border-2 border-[#ccc] rounded-lg mb-10 p-5 w-[80%]">
      <a href={props.artist.externalUrls.externalUrls.spotify} target="_blank" className='w-24 h-24 mr-10'>
        <img src={props.artist.images[0].url} alt={props.artist.name} className="w-24 h-24 mr-20" />
      </a>
      <div className="grow">
        <h3 className="m-0 text-2xl">{props.artist.name}</h3>
        <p className="mt-5 text-lg" >Genre: {formattedGenres}</p>
        <p className="text-lg">Popularity: {props.artist.popularity}</p>
      </div>
    </div>
  );
};

export default ArtistCard;
