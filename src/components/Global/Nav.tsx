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
  const { id, darkmode } = useAppSelector((state) => state.user);
  const [text, setText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const searchRef = useRef<null | HTMLInputElement>(null);
  const navigate = useNavigate();

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
    navigate({
      pathname: '/movies',
    });
    toast.info('Logged out', toastConfig);
  };

  const toggleDark = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    if (darkmode) {
      document.body.classList.add('darkmode');
      localStorage.setItem('darkmode', JSON.stringify(true));
    } else {
      document.body.classList.remove('darkmode');
      localStorage.removeItem('darkmode');
    }
  }, [darkmode]);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <div className={styles.links}>
            <Link
              to="/movies"
              className={`${pathname === '/movies' ? styles.active : ''}`}
            >
              Movies
            </Link>
            <Link
              to="/shows"
              className={`${pathname === '/shows' ? styles.active : ''}`}
            >
              Shows
            </Link>
          </div>
          <MobileMenuBtn menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <form onSubmit={onSubmit}>
            <div className={styles.search}>
              <HiOutlineSearch className={styles.magnify} />
              <input
                ref={searchRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="Search..."
              />
              {text !== '' && (
                <button>
                  <IoCloseOutline
                    onClick={clearSearch}
                    className={styles.clear}
                  />
                </button>
              )}
            </div>
          </form>
          <div className={styles.watchlistAndAuth}>
            <button onClick={toggleDark} className={styles.theme}>
              {darkmode ? <IoSunny /> : <IoMoon />}
            </button>
            <Link to="/watchlist" className={styles.watchlist}>
              <BsBookmarkFill />
              Watchlist
            </Link>
            {id ? (
              <button onClick={logout} className={styles.auth}>
                Logout
              </button>
            ) : (
              <Link to="/auth" className={styles.auth}>
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
