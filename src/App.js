import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './app.scss';
import Nav from './components/Nav';
import Grid from './components/Grid';
import Footer from './components/Footer';
import NoRoute from './components/utilities/NoRoute';
import CardDetails from './components/CardDetails';

// const movies = `https://api.themoviedb.org/3/discover/movie?vote_count.gte=1000&vote_average.gte=7&sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}`;

// const shows = `https://api.themoviedb.org/3/tv/popular?vote_count.gte=2500&api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

const movies = `https://api.themoviedb.org/3/discover/movie?vote_count.gte=500&vote_average.gte=7.2&sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY}`;

const shows = `https://api.themoviedb.org/3/tv/popular?vote_count.gte=2000&api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main className="container">
        <Routes>
          <Route exact path="/movies" element={<Grid url={movies} />}></Route>
          <Route exact path="shows" element={<Grid url={shows} />}></Route>
          <Route exact path="search" element={<Grid />}></Route>
          <Route exact path="/movies/:id" element={<CardDetails />} />
          <Route exact path="/shows/:id" element={<CardDetails />} />
          <Route path="/" element={<Navigate replace to="movies" />} />
          <Route path="*" element={<NoRoute />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
