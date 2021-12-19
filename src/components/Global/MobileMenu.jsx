import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.scss';

const MobileMenu = () => {
  const { appState, dispatch } = useContext(AppContext);

  const closeOverlay = (e) => {
    if (e.target.tagName === 'A') {
      dispatch({ type: 'TOGGLE-MENU' });
    }
  };

  return createPortal(
    <div className={styles.menuWrap}>
      {/* <input type="checkbox" />
      <div className={styles.hamburger}>
        <div></div>
      </div> */}
      <div
        className={`${styles.menu} ${appState.menuOpen ? styles.active : ''}`}
      >
        <div>
          <div>
            <ul onClick={closeOverlay} className={styles.links}>
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
