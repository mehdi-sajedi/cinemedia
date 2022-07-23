import React from 'react';
import { useSelector } from 'react-redux';
import ShowsCard from './ShowsCard';
import styles from './ShowsGrid.module.scss';

const ShowsGrid = () => {
  const { results, filterMenuOpen } = useSelector((state) => state.show);

  return (
    <section
      className={`${styles.grid} ${filterMenuOpen ? styles.menuOpen : ''}`}
    >
      {results.map((entry) => {
        return (
          entry.poster_path && (
            <ShowsCard {...entry} key={`${entry.id}${entry.credit_id}`} />
          )
        );
      })}
    </section>
  );
};

export default React.memo(ShowsGrid);
