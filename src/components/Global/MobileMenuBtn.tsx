import React from 'react';
import styles from './MobileMenuBtn.module.scss';

interface MobileMenuBtnProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenuBtn = ({ menuOpen, setMenuOpen }: MobileMenuBtnProps) => {
  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.button}>
      <input
        onClick={toggleMenu}
        type="checkbox"
        className={`${menuOpen ? styles.active : ''}`}
      />
      <div className={styles.hamburger}>
        <div></div>
      </div>
    </div>
  );
};

export default MobileMenuBtn;
