import React from 'react';
import MovieCard from './MovieCard';

const MoviesGrid = ({ movies, setMovies }) => {
  return (
    <div className="movies-grid">
      {movies.map((movie) => {
        return <MovieCard {...movie} />;
      })}
    </div>
  );
};

export default MoviesGrid;
