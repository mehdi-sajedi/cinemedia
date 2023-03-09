import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './app.scss';
import Nav from './components/Global/Nav';
import Footer from './components/Global/Footer';
import NoRoute from './components/Utilities/NoRoute';
import ScrollToTop from './components/Utilities/ScrollToTop';
import Movies from './pages/Movies';
import Shows from './pages/Shows';
import Search from './pages/Search';
import SingleMovie from './pages/SingleMovie';
import SingleShow from './pages/SingleShow';
import Person from './pages/SinglePerson';
import ShowCastAndCrew from './pages/ShowCastAndCrew';
import MovieCastAndCrew from './pages/MovieCastAndCrew';
import AuthPage from './pages/AuthPage';
import Watchlist from './pages/Watchlist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import People from './pages/People';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Nav />
        <main>
          <Routes>
            <Route path="/movies">
              <Route index element={<Movies />} />
              <Route path=":id" element={<SingleMovie />} />
              <Route path=":id/cast" element={<MovieCastAndCrew />} />
            </Route>
            <Route path="/shows">
              <Route index element={<Shows />} />
              <Route path=":id" element={<SingleShow />} />
              <Route path=":id/cast" element={<ShowCastAndCrew />} />
            </Route>
            <Route path="/person">
              <Route index element={<People />} />
              <Route path=":id" element={<Person />} />
            </Route>
            <Route path="/search" element={<Search />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/" element={<Navigate replace to="movies" />} />
            <Route path="*" element={<NoRoute />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
