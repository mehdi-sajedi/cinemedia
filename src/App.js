import React, { useContext } from 'react';
import { AppContext } from './context/app-context';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './app.scss';
import Nav from './components/Global/Nav';
import Grid from './components/Home/Grid';
import Footer from './components/Global/Footer';
import NoRoute from './components/Utilities/NoRoute';
import Showcase from './components/MediaDetails/Showcase';
import PersonPage from './components/PersonDetails/PersonPage';
import SearchResultsText from './components/Global/SearchResultsText';
import Pagination from './components/Home/Pagination';
import Recommendations from './components/MediaDetails/Recommendations';
import Details from './components/MediaDetails/Details';
import MobileMenu from './components/Global/MobileMenu';
import FilterBtn from './components/Home/FilterBtn';
import FilterMenu from './components/Home/FilterMenu';
import { movieGenres, showGenres } from './components/Utilities/helpers';
import ScrollToTop from './components/Utilities/ScrollToTop';

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
              element={
                <>
                  <FilterBtn />
                  <Grid url={movies} route="movies" />
                  <Pagination
                    currentPage={appState.pagination.currentMoviesPage}
                    totalMedia={appState.pagination.totalMovies}
                  />
                  <FilterMenu genres={movieGenres} />
                </>
              }
            ></Route>
            <Route
              path="shows"
              element={
                <>
                  <FilterBtn />
                  <Grid url={shows} route="shows" />
                  <Pagination
                    currentPage={appState.pagination.currentShowsPage}
                    totalMedia={appState.pagination.totalShows}
                  />
                  <FilterMenu genres={showGenres} />
                </>
              }
            ></Route>
            <Route
              path="search"
              element={
                <>
                  <SearchResultsText />
                  <Grid />
                </>
              }
            ></Route>
            <Route
              path="/movies/:id"
              element={
                <>
                  <Showcase />
                  <Details />
                  {appState.currentMedia.recommendations?.length > 0 && (
                    <Recommendations />
                  )}
                </>
              }
            />
            <Route
              path="/shows/:id"
              element={
                <>
                  <Showcase />
                  <Details />
                  {appState.currentMedia.recommendations?.length > 0 && (
                    <Recommendations />
                  )}
                </>
              }
            />
            <Route path="/person/:id" element={<PersonPage />} />
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
