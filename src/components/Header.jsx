import React from 'react';
import HeaderStyles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className={HeaderStyles.nav}>
      <header className={HeaderStyles.header}>
        <div className="header-container">
          <Link to="/">Movies</Link>
          <Link to="/tv">TV</Link>
        </div>
      </header>
    </nav>
  );
};

export default Header;
