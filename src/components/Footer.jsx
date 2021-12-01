import React from 'react';
import FooterStyles from './Footer.module.scss';
import logo from '../images/logo1.svg';

const Footer = () => {
  return (
    <footer className={FooterStyles.footer}>
      <div className={FooterStyles.content}>
        <p>Data provided by:</p>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          <img src={logo} alt="" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
