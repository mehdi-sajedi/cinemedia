import React, { useContext } from 'react';
import { AppContext } from './context/app-context';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './app.scss';
import Nav from './components/Global/Nav';
import Grid from './components/Home/Grid';
import Footer from './components/Global/Footer';
import NoRoute from './components/Utilities/NoRoute';
import Showcase from './components/MediaDetails/Showcase';
import Cast from './components/MediaDetails/Cast';
import PersonPage from './components/PersonDetails/PersonPage';
import SearchResultsText from './components/Global/SearchResultsText';
import Pagination from './components/Home/Pagination';
import Sidebar from './components/MediaDetails/Sidebar';

function App() {
  const { appState } = useContext(AppContext);

  const movies = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${appState.pagination.currentMoviesPage}`;

  const shows = `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}&page=${appState.pagination.currentShowsPage}`;

  const detailsStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    columnGap: '3rem',
    maxWidth: 'clamp(1px, 1440px, 92vw)',
    margin: '0 auto 3rem',
    overflow: 'auto',
  };

  return (
    <BrowserRouter>
      <Nav />
      <main className="container">
        <Routes>
          <Route
            exact
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
            exact
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
            exact
            path="search"
            element={
              <>
                <SearchResultsText />
                <Grid />
              </>
            }
          ></Route>
          <Route
            exact
            path="/movies/:id"
            element={
              <>
                <Showcase />
                <section style={detailsStyles}>
                  <Cast />
                  <Sidebar />
                </section>
              </>
            }
          />
          <Route
            exact
            path="/shows/:id"
            element={
              <>
                <Showcase />
                <section style={detailsStyles}>
                  <Cast />
                  <Sidebar />
                </section>
              </>
            }
          />
          <Route exact path="/person/:id" element={<PersonPage />} />
          <Route path="/" element={<Navigate replace to="movies" />} />
          <Route path="*" element={<NoRoute />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
