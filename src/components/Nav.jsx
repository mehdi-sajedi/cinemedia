import React, { useContext } from 'react';
import { AppContext } from '../context/app-context';
import NavStyles from './Nav.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';

const Nav = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (e.target[0].value.trim() === '') return;
    dispatch({ type: 'SET-SEARCH-TEXT', payload: e.target[0].value });

    const person = `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_KEY}&query=${e.target[0].value}`;

    const getResults = () => {
      let personResults = [];

      fetch(person)
        .then((data) => data.json())
        .then(({ results }) => {
          console.log(results);
          if (results.length === 0) return;
          const personID = results[0].id;
          fetch(
            `https://api.themoviedb.org/3/person/${personID}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}`
          )
            .then((data) => data.json())
            .then((stuff) => {
              personResults = stuff.cast;
              console.log(personResults);
              dispatch({ type: 'SET-RESULTS', payload: personResults });
              stuff.cast.forEach((entry) => {
                console.log(entry.media_type);
              });
            });
        });
    };

    getResults();

    navigate('/search');
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
            <input type="text" />
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
