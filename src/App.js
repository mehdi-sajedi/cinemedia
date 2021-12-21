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

function App() {
  const { appState } = useContext(AppContext);

  // const movies = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&page=${appState.pagination.currentMoviesPage}`;
  // const shows = `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.REACT_APP_API_KEY}&page=${appState.pagination.currentShowsPage}`;

  const movies = `https://api.themoviedb.org/3/discover/movie/?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=${appState.pagination.currentMoviesPage}`;

  const shows = `https://api.themoviedb.org/3/discover/tv/?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&with_original_language=en&first_air_date_year=1998&sort_by=popularity.desc&page=${appState.pagination.currentShowsPage}`;

  return (
    <BrowserRouter>
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
                <FilterMenu />
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
                <FilterMenu />
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
    </BrowserRouter>
  );
}

export default App;
