import React, { useContext } from 'react';
import { AppContext } from './context/app-context';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './app.scss';
import Nav from './components/Global/Nav';
import Footer from './components/Global/Footer';
import NoRoute from './components/Utilities/NoRoute';
import MobileMenu from './components/Global/MobileMenu';
import ScrollToTop from './components/Utilities/ScrollToTop';
//
import Movies from './pages/Movies';
import Shows from './pages/Shows';
import Search from './pages/Search';
import SingleMovie from './pages/SingleMovie';
import SingleShow from './pages/SingleShow';
import Person from './pages/Person';

function App() {
  const { appState } = useContext(AppContext);

  const filters = {
    movies: {
      runtime: `&with_runtime.gte=${
        appState.filters.movies.runtime?.value[0] || 0
      }&with_runtime.lte=${appState.filters.movies.runtime?.value[1] || 999}`,

      year: `&primary_release_date.gte=${
        appState.filters.movies.year?.valueFormatted[0] || 0
      }&primary_release_date.lte=${
        appState.filters.movies.year?.valueFormatted[1] || 9999
      }`,

      rating: `&vote_average.gte=${
        appState.filters.movies.rating?.valueFormatted[0] || 0
      }&vote_average.lte=${
        appState.filters.movies.rating?.valueFormatted[1] || 10
      }`,

      genre: `&with_genres=${appState.filters.movies.genres?.join('|') || ''}`,

      watchProviders: `&with_watch_providers=${
        appState.filters.movies.watchProviders?.join('|') || ''
      }&watch_region=US`,
    },

    shows: {
      runtime: `&with_runtime.gte=${
        appState.filters.shows.runtime?.value[0] || 0
      }&with_runtime.lte=${appState.filters.shows.runtime?.value[1] || 999}`,

      year: `&first_air_date.gte=${
        appState.filters.shows.year?.valueFormatted[0] || 0
      }&first_air_date.lte=${
        appState.filters.shows.year?.valueFormatted[1] || 9999
      }`,

      rating: `&vote_average.gte=${
        appState.filters.shows.rating?.valueFormatted[0] || 0
      }&vote_average.lte=${
        appState.filters.shows.rating?.valueFormatted[1] || 10
      }`,

      genre: `&with_genres=${appState.filters.shows.genres?.join('|') || ''}`,

      watchProviders: `&with_watch_providers=${
        appState.filters.shows.watchProviders?.join('|') || ''
      }&watch_region=US`,
    },
  };

  const movies = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${appState.pagination.currentMoviesPage}&language=en-US&sort_by=popularity.desc${filters.movies.runtime}${filters.movies.year}${filters.movies.rating}${filters.movies.genre}${filters.movies.watchProviders}`;

  const shows = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&page=${appState.pagination.currentShowsPage}&language=en-US&sort_by=popularity.desc${filters.shows.runtime}${filters.shows.year}${filters.shows.rating}${filters.shows.genre}${filters.shows.watchProviders}`;

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Nav />
        <MobileMenu />
        <main>
          <Routes>
            <Route
              path="/movies"
              element={<Movies movies={movies} route="movies" />}
            />
            <Route
              path="/shows"
              element={<Shows shows={shows} route="shows" />}
            />
            <Route path="/search" element={<Search />} />
            <Route path="/movies/:id" element={<SingleMovie />} />
            <Route path="/shows/:id" element={<SingleShow />} />
            <Route path="/person/:id" element={<Person />} />
            <Route path="/" element={<Navigate replace to="movies" />} />
            <Route path="*" element={<NoRoute />} />
          </Routes>
        </main>
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
