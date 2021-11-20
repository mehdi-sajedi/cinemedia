import React, { useState, useEffect } from 'react';
import MoviesGrid from './components/MoviesGrid';
import './app.scss';

const themovieDB = `https://api.themoviedb.org/3/discover/movie?vote_count.gte=2500&vote_average.gte=7.8&sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}`;

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      fetch(themovieDB)
        .then((data) => data.json())
        .then((data) => {
          setMovies(data.results);
          console.log(data.results);
        });
    };

    getMovies();
  }, []);

  return (
    <main>
      <MoviesGrid movies={movies} setMovies={setMovies} />
    </main>
  );
}

export default App;
