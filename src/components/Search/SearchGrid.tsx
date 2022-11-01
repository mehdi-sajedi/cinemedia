import { useAppSelector } from '../../hooks';
import styles from './SearchGrid.module.scss';
import MoviesCard from '../Movies/MoviesCard';
import ShowsCard from '../Shows/ShowsCard';
import { isMovie } from '../../features/search/searchTypes';

const SearchGrid = () => {
  const { results } = useAppSelector((state) => state.search);

  return (
    <section className={`${styles.grid} ${styles[results.length]}`}>
      {results?.map((entry) => {
        return isMovie(entry) ? (
          <MoviesCard {...entry} key={`${entry.id}${entry.credit_id}`} />
        ) : (
          <ShowsCard {...entry} key={`${entry.id}${entry.credit_id}`} />
        );
      })}
    </section>
  );
};

export default SearchGrid;
