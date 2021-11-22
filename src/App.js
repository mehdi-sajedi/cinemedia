import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.scss';
import Nav from './components/Nav';
import Grid from './components/Grid';

const movies = `https://api.themoviedb.org/3/discover/movie?vote_count.gte=1000&vote_average.gte=7&sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}`;

const tvShows = `https://api.themoviedb.org/3/tv/popular?vote_count.gte=2500&api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main className="container">
        <Routes>
          <Route exact path="/" element={<Grid url={movies} />}></Route>
          <Route exact path="tv" element={<Grid url={tvShows} />}></Route>
          <Route
            exact
            path="search"
            element={<Grid fromSearch={true} />}
          ></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
