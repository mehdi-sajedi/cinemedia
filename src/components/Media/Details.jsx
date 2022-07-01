import React from 'react';
import Cast from './Cast';
import Sidebar from './Sidebar';
import styles from './Details.module.scss';

// appState.currentMedia.credits?.cast.length > 0 && <Cast />

const Details = () => {
  return (
    <section className={styles.details}>
      <Cast />
      <Sidebar />
    </section>
  );
};

export default Details;
