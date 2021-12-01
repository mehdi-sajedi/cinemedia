import React, { useContext, useRef } from 'react';
import { AppContext } from '../context/app-context';
import NavStyles from './Nav.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';

// hit the multi route
// if the first result is a person, show the persons work like we are doing in the main branch
// if the first result is NOT a person, show a combination of tv shows and movies based on the search text

const Nav = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const searchRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const searchText = searchRef.current.value;
    if (searchText.trim() === '') return;
    dispatch({ type: 'SET-SEARCH-TEXT', payload: searchText });

    const multi = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${searchText}`;

    const getResults = () => {
      let personResults = [];

      fetch(multi)
        .then((data) => data.json())
        .then(({ results }) => {
          console.log(results);
          if (results.length === 0) return;

          const finder = results.find((entry) => {
            return (
              entry.name?.toLowerCase() === searchText.toLowerCase() &&
              entry.media_type === 'person'
            );
          });

          console.log(finder && 'it is true');

          if (results[0].media_type === 'person' || finder) {
            // PERSON
            let personID;

            if (finder) {
              personID = finder.id;
            } else {
              personID = results[0].id;
            }

            console.log(personID);

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
          } else if (results[0].media_type !== 'person') {
            // TV & MOVIE
            const onlyTvAndMovie = results.filter(
              (entry) => entry.media_type !== 'person'
            );
            dispatch({ type: 'SET-RESULTS', payload: onlyTvAndMovie });
          }
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
