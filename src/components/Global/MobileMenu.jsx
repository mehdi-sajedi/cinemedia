import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.scss';

const MobileMenu = () => {
  const { appState, dispatch } = useContext(AppContext);
  // const { ref, showComponent, setShowComponent } = useShowComponent();

  const closeOverlay = (e) => {
    // console.log(e.target.classList.contains('overlay'));
    if (e.target.tagName === 'A' || e.target.classList.contains('overlay')) {
      dispatch({ type: 'TOGGLE-NAV-MENU' });
    }
  };

  return createPortal(
    <div onClick={closeOverlay} className={styles.menuWrap}>
      <div
        className={`${styles.menu} ${appState.menuOpen ? styles.active : ''}`}
      >
        <div className="overlay">
          <div>
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
