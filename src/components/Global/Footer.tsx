import styles from './Footer.module.scss';
import logo from '../../images/logo1.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>Data provided by:</p>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          <img src={logo} alt="" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
