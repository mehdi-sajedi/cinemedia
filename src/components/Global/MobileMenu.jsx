import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.scss';

const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const closeOverlay = (e) => {
    if (e.target.tagName === 'A' || e.target.classList.contains('overlay')) {
      setMenuOpen((prevState) => !prevState);
    }
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
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('mobileMenu')
  );
};

export default MobileMenu;
