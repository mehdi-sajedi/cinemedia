import React, { useContext, useRef } from 'react';
import { AppContext } from '../../context/app-context';
import { useLocation } from 'react-router';
import { Link, useNavigate, createSearchParams } from 'react-router-dom';
import NavStyles from './Nav.module.scss';
import { HiOutlineSearch } from 'react-icons/hi';

const Nav = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const searchRef = useRef();
  const { pathname } = useLocation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const searchText = searchRef.current.value.trim();
    if (searchText.trim() === '') return;

    dispatch({
      type: 'SET-SEARCH',
      payload: {
        query: searchText,
        person: null,
        personFullName: '',
        id: null,
      },
    });

    navigate({
      pathname: '/search',
      search: `?${createSearchParams({
        query: searchText,
      })}`,
    });
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
