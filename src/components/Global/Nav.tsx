import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useLocation } from 'react-router';
import { Link, useNavigate, createSearchParams } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoCloseOutline, IoMoon, IoSunny } from 'react-icons/io5';
import { BsBookmarkFill } from 'react-icons/bs';
import styles from './Nav.module.scss';
import MobileMenuBtn from './MobileMenuBtn';
import MobileMenu from './MobileMenu';
import { logoutUser, toggleTheme } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import { toastConfig } from '../../utilities/toastConfig';

const Nav = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id, lightmode } = useAppSelector((state) => state.user);
  const [text, setText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef<null | HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() === '') return;

    navigate({
      pathname: '/search',
      search: '?' + createSearchParams({ query: text }),
    });
  };

  const clearSearch = () => {
    setText('');
    searchRef?.current?.focus();
  };

  const logout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
    navigate({ pathname: '/movies' });
    toast.info('Logged out', toastConfig);
  };

  const toggleLight = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    if (lightmode) {
      document.body.classList.add('lightmode');
      localStorage.setItem('lightmode', JSON.stringify(true));
    } else {
      document.body.classList.remove('lightmode');
      localStorage.removeItem('lightmode');
    }
  }, [lightmode]);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <ul className={styles.links}>
            <li>
              <Link
                to='/movies'
                className={`${pathname === '/movies' ? styles.active : ''}`}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to='/shows'
                className={`${pathname === '/shows' ? styles.active : ''}`}
              >
                Shows
              </Link>
            </li>
            <li>
              <Link
                to='/person'
                className={`${pathname === '/person' ? styles.active : ''}`}
              >
                People
              </Link>
            </li>
          </ul>
          <form onSubmit={onSubmit}>
            <div className={styles.search}>
              <i className={styles.magnify}>
                <HiOutlineSearch />
              </i>
              <input
                ref={searchRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                type='text'
                placeholder='Search...'
              />
              {text !== '' && (
                <button
                  type='button'
                  className={styles.clear}
                  onClick={clearSearch}
                >
                  <IoCloseOutline />
                </button>
              )}
            </div>
          </form>
          <MobileMenuBtn menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <div className={styles.watchlistAndAuth}>
            <button onClick={toggleLight} className={styles.theme}>
              {lightmode ? <IoMoon /> : <IoSunny />}
            </button>
            <Link to='/watchlist' className={styles.watchlist}>
              <BsBookmarkFill />
              Watchlist
            </Link>
            {id ? (
              <button onClick={logout} className={styles.auth}>
                Logout
              </button>
            ) : (
              <Link to='/auth' className={styles.auth}>
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export default Nav;
