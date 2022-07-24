import React from 'react';
import { useSelector } from 'react-redux';
import MoviesCard from './MoviesCard';
import styles from './MoviesGrid.module.scss';

const MoviesGrid = () => {
  const { results, filterMenuOpen } = useSelector((state) => state.movie);

  return (
    <section
      className={`${styles.grid} ${filterMenuOpen ? styles.menuOpen : ''}`}
    >
      {results.map((entry) => {
        return (
          entry.poster_path && (
            <MoviesCard {...entry} key={`${entry.id}${entry.credit_id}`} />
          )
        );
      })}
    </section>
  );
};

export default React.memo(MoviesGrid);
