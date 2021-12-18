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

function App() {
  const { appState } = useContext(AppContext);

  const movies = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${appState.pagination.currentMoviesPage}`;

  const shows = `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}&page=${appState.pagination.currentShowsPage}`;

  return (
    <BrowserRouter>
      <Nav />
      <MobileMenu />
      <main className="container">
        <Routes>
          <Route
            path="/movies"
            element={
              <>
                <Grid url={movies} route="movies" />
                <Pagination
                  currentPage={appState.pagination.currentMoviesPage}
                  totalMedia={appState.pagination.totalMovies}
                />
              </>
            }
          ></Route>
          <Route
            path="shows"
            element={
              <>
                <Grid url={shows} route="shows" />
                <Pagination
                  currentPage={appState.pagination.currentShowsPage}
                  totalMedia={appState.pagination.totalShows}
                />
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
