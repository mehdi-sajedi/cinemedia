import React from 'react';

const posterPath = 'https://image.tmdb.org/t/p/w500/';

const MovieCard = ({ original_title, poster_path }) => {
  return (
    <div className='movie-card'>
      <h1>{original_title}</h1>
      <img src={`${posterPath}${poster_path}`} alt="" />
    </div>
  );
};

export default MovieCard;
