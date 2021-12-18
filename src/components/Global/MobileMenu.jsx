import React from 'react';
import styles from './MobileMenu.module.scss';
import { createPortal } from 'react-dom';

const MobileMenu = () => {
  return createPortal(
    <div className={styles.menuWrap}>
      <input type="checkbox" class="toggler" />
      <div className={styles.hamburger}>
        <div></div>
      </div>
      <div className={styles.menu}>
        <div>
          <div>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
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
