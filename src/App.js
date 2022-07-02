import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './app.scss';
import Nav from './components/Global/Nav';
import Footer from './components/Global/Footer';
import NoRoute from './components/Utilities/NoRoute';
import MobileMenu from './components/Global/MobileMenu';
import ScrollToTop from './components/Utilities/ScrollToTop';
import Movies from './pages/Movies';
import Shows from './pages/Shows';
import Search from './pages/Search';
import SingleMovie from './pages/SingleMovie';
import SingleShow from './pages/SingleShow';
import Person from './pages/Person';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Nav />
        <MobileMenu />
        <main>
          <Routes>
            <Route path="/movies" element={<Movies />} />
            <Route path="/shows" element={<Shows />} />
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
