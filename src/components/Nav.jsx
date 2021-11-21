import React, { useContext } from 'react';
import { AppContext } from '../context/app-context';
import NavStyles from './Nav.module.scss';
import { Link } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';

const Nav = () => {
  const { appState, dispatch } = useContext(AppContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const req = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&page=1&query=${appState.search}`;

    let person = 0;
    let movie = 0;
    let tv = 0;

    fetch(req)
      .then((data) => data.json())
      .then(({ results }) => {
        dispatch({ type: 'GET-SEARCH-RESULTS', payload: results });

        results.forEach((entry) => {
          if (entry.media_type === 'person') {
            person++;
            console.log(entry.known_for);
          } else if (entry.media_type === 'movie') {
            movie++;
          } else if (entry.media_type === 'tv') {
            tv++;
          }
        });

        console.log(`Person: ${person} || Movie: ${movie} || TV: ${tv}`);
      })
      .catch((err) => console.error(err));
  };

  const handleSearchType = (e) => {
    dispatch({ type: 'SET-SEARCH-TEXT', payload: e.target.value });
  };

  return (
    <nav className={NavStyles.nav}>
      <div className={NavStyles.navContent}>
        <div className={NavStyles.links}>
          <Link to="/">Movies</Link>
          <Link to="/tv">TV</Link>
        </div>
        <form onSubmit={handleFormSubmit} className={NavStyles.form}>
          <div className={NavStyles.search}>
            <i>
              <HiOutlineSearch />
            </i>
            <input onChange={handleSearchType} type="text" />
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
