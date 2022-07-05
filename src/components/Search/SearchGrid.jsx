import React from 'react';
import { useSelector } from 'react-redux';
import GridStyles from './SearchGrid.module.scss';
import MoviesCard from '../Movies/MoviesCard';
import ShowsCard from '../Shows/ShowsCard';

const SearchGrid = () => {
  const { results } = useSelector((state) => state.search);

  return (
    <section className={GridStyles.grid}>
      {results?.map((entry) => {
        return entry.media_type === 'movie' ? (
          <MoviesCard {...entry} key={`${entry.id}${entry.credit_id}`} />
        ) : (
          <ShowsCard {...entry} key={`${entry.id}${entry.credit_id}`} />
        );
      })}
    </section>
  );
};

export default React.memo(SearchGrid);
