import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import styles from './MobileMenuBtn.module.scss';

const MobileMenuBtn = () => {
  const { appState, dispatch } = useContext(AppContext);

  const toggleMenu = () => {
    dispatch({ type: 'TOGGLE-MENU' });
  };

  return (
    <div className={styles.button}>
      <input
        onClick={toggleMenu}
        type="checkbox"
        className={`${appState.menuOpen ? styles.active : ''}`}
      />
      <div className={styles.hamburger}>
        <div></div>
      </div>
    </div>
  );
};

export default MobileMenuBtn;
