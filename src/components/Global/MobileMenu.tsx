import { useAppDispatch, useAppSelector } from '../../hooks';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import { IoCloseOutline, IoMoon, IoSunny } from 'react-icons/io5';
import { FaTv } from 'react-icons/fa';
import { BiCameraMovie } from 'react-icons/bi';
import { BsPeopleFill, BsBookmarkFill } from 'react-icons/bs';
import { logoutUser, toggleTheme } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastConfig } from '../../utilities/toastConfig';

const mobileMenu = document.getElementById('mobileMenu') as HTMLElement;

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({ menuOpen, setMenuOpen }: MobileMenuProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, lightmode } = useAppSelector((state) => state.user);

  const closeOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.closest('.close') || target.classList.contains('outside'))
      setMenuOpen(false);
  };

  const logout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('user');
    navigate({
      pathname: '/movies',
    });
    toast.info('Logged out', toastConfig);
  };

  const toggleLight = () => {
    dispatch(toggleTheme());
  };

  return createPortal(
    <div onClick={closeOverlay} className={styles.menuWrap}>
      <div
        className={`${styles.menu} ${menuOpen ? styles.active : ''} outside`}
      >
        <div className={`overlay ${styles.overlay}`}>
          <button className={`${styles.closeBtn} close`}>
            <IoCloseOutline />
          </button>
          <div className={styles.linksWrap}>
            <ul className={styles.links}>
              <li className="close">
                <Link to="/movies">
                  <BiCameraMovie /> Movies
                </Link>
              </li>
              <li className="close">
                <Link to="/shows">
                  <FaTv /> Shows
                </Link>
              </li>
              <li className="close">
                <Link to="/person">
                  <BsPeopleFill />
                  People
                </Link>
              </li>
              <li className="close">
                <Link to="/watchlist">
                  <BsBookmarkFill /> Watchlist
                </Link>
              </li>
              <li className={`${styles.authLi} close`}>
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
                  onClick={toggleLight}
                  className={`${styles.theme} theme`}
                >
                  {lightmode ? <IoMoon /> : <IoSunny />}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>,
    mobileMenu
  );
};

export default MobileMenu;
