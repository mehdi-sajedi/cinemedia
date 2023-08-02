import React from 'react';
import styles from './MobileMenuBtn.module.scss';
import { HiOutlineMenu } from 'react-icons/hi';

interface MobileMenuBtnProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenuBtn = ({ menuOpen, setMenuOpen }: MobileMenuBtnProps) => {
  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <button
      className={styles.btn}
      onClick={toggleMenu}
      aria-pressed={menuOpen}
      aria-label='Mobile menu'
    >
      <HiOutlineMenu />
    </button>
  );
};

export default MobileMenuBtn;
