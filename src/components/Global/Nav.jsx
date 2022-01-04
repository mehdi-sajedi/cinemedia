import React, { useRef, useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { useLocation } from 'react-router';
import { Link, useNavigate, createSearchParams } from 'react-router-dom';
import NavStyles from './Nav.module.scss';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';
import MobileMenuBtn from './MobileMenuBtn';

const Nav = () => {
  const { appState, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const searchRef = useRef();
  const { pathname } = useLocation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const searchText = searchRef.current.value.trim();
    if (searchText.trim() === '') return;

    navigate({
      pathname: '/search',
      search: `?${createSearchParams({
        query: searchText,
      })}`,
    });
  };

  const handleKeydown = (e) => {
    dispatch({ type: 'SET-CURRENT-SEARCH-TEXT', payload: e.target.value });
  };

  const handleClearSearch = () => {
    dispatch({ type: 'SET-CURRENT-SEARCH-TEXT', payload: '' });
    searchRef.current.focus();
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
        <MobileMenuBtn />
        <form onSubmit={handleFormSubmit} className={NavStyles.form}>
          <div className={NavStyles.search}>
            <HiOutlineSearch className={NavStyles.magnify} />
            <input
              value={appState.currentSearchText}
              onChange={handleKeydown}
              ref={searchRef}
              type="text"
              placeholder="Search..."
            />
            {appState.currentSearchText !== '' && (
              <IoCloseOutline
                onClick={handleClearSearch}
                className={NavStyles.clear}
              />
            )}
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
