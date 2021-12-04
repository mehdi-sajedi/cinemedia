import React, { useContext, useRef } from 'react';
import { AppContext } from '../../context/app-context';
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

    const URL_MULTI = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}`;

    const res = await fetch(URL_MULTI);
    const data = await res.json();
    console.log(data);
    if (data.results.length === 0) return;

    const personExactMatch = data.results.find((entry) => {
      if (
        entry.media_type === 'person' &&
        entry.name.toLowerCase() === searchText.toLowerCase()
      ) {
        dispatch({
          type: 'SET-SEARCH',
          payload: {
            input: searchText,
            person: true,
            personFullName: entry.name,
            id: entry.id,
          },
        });
        return entry;
      }

      return null;
    });

    // User searching for person
    if (personExactMatch || data.results[0].media_type === 'person') {
      const personID = (personExactMatch ? personExactMatch : data.results[0])
        .id;

      if (!personExactMatch) {
        dispatch({
          type: 'SET-SEARCH',
          payload: {
            input: searchText,
            person: true,
            personFullName: data.results[0].name,
            id: data.results[0].id,
          },
        });
      }

      const URL_PERSON_ID = `https://api.themoviedb.org/3/person/${personID}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}`;

      const res = await fetch(URL_PERSON_ID);
      const personWork = await res.json();
      console.log(personWork);
      dispatch({ type: 'SET-RESULTS-FROM-SEARCH', payload: personWork.cast });
    }
    // User searching for TV Show/Movie
    else {
      const tvAndMovieResults = data.results.filter(
        (entry) => entry.media_type !== 'person'
      );
      console.log(tvAndMovieResults);
      dispatch({ type: 'SET-RESULTS-FROM-SEARCH', payload: tvAndMovieResults });
      dispatch({
        type: 'SET-SEARCH',
        payload: { input: searchText, person: false, personFullName: '' },
      });
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
