import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, toggleTheme } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastConfig } from '../../utilities/toastConfig';

const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, darkmode } = useSelector((state) => state.user);

  const closeOverlay = (e) => {
    if (!e.target.closest('.theme')) {
      setMenuOpen((prevState) => !prevState);
    }
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

  return createPortal(
    <div onClick={closeOverlay} className={styles.menuWrap}>
      <div className={`${styles.menu} ${menuOpen ? styles.active : ''}`}>
        <div className={`overlay ${styles.overlay}`}>
          <div className={styles.linksWrap}>
            <ul className={styles.links}>
              <li>
                <Link to="/movies">Movies</Link>
              </li>
              <li>
                <Link to="/shows">Shows</Link>
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
              <li>
                {id ? (
                  <button onClick={logout} className={styles.auth}>
                    Logout
                  </button>
                ) : (
                  <Link to="/auth" className={styles.auth}>
                    Login
                  </Link>
                )}
              </li>
              <li>
                <button
                  onClick={toggleDark}
                  className={`${styles.theme} theme`}
                >
                  {darkmode ? <IoSunny /> : <IoMoon />}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('mobileMenu')
  );
};

export default MobileMenu;
