import React, { useContext, useRef } from 'react';
import { AppContext } from '../context/app-context';
import { useLocation } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import NavStyles from './Nav.module.scss';
import { HiOutlineSearch } from 'react-icons/hi';

const Nav = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const searchRef = useRef();
  const { pathname } = useLocation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const searchText = searchRef.current.value;
    if (searchText.trim() === '') return;

    dispatch({ type: 'SET-SEARCH-TEXT', payload: searchText });

    const URL_MULTI = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}`;

    const res = await fetch(URL_MULTI);
    const { results } = await res.json();
    if (results.length === 0) return;

    const personExactMatch = results.find((entry) => {
      return (
        entry.media_type === 'person' &&
        entry.name.toLowerCase() === searchText.toLowerCase()
      );
    });

    // User searching for person
    if (personExactMatch || results[0].media_type === 'person') {
      const personID = (personExactMatch ? personExactMatch : results[0]).id;

      const URL_PERSON_ID = `https://api.themoviedb.org/3/person/${personID}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}`;

      const res = await fetch(URL_PERSON_ID);
      const { cast: personResults } = await res.json();
      console.log(personResults);
      dispatch({ type: 'SET-RESULTS', payload: personResults });
    }
    // User searching for TV Show/Movie
    else {
      const tvAndMovieResults = results.filter(
        (entry) => entry.media_type !== 'person'
      );
      dispatch({ type: 'SET-RESULTS', payload: tvAndMovieResults });
    }

    navigate('/search');
  };

  return (
    <nav className={NavStyles.nav}>
      <div className={NavStyles.navContent}>
        <div className={NavStyles.links}>
          <Link
            to="/movies"
            className={`${pathname === '/movies' ? NavStyles.active : ''}`}
          >
            Movies
          </Link>
          <Link
            to="/shows"
            className={`${pathname === '/shows' ? NavStyles.active : ''}`}
          >
            Shows
          </Link>
        </div>
        <form onSubmit={handleFormSubmit} className={NavStyles.form}>
          <div className={NavStyles.search}>
            <i>
              <HiOutlineSearch />
            </i>
            <input ref={searchRef} type="text" />
          </div>
          <button typeof="submit" className={NavStyles.submit}>
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Nav;
