import styles from './MobileMenuBtn.module.scss';

const MobileMenuBtn = ({ menuOpen, setMenuOpen }) => {
  const toggleMenu = (e) => {
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
