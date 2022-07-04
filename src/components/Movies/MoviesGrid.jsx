import { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../../features/movies/movieSlice';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import MoviesCard from './MoviesCard';
import styles from './MoviesGrid.module.scss';
import Loading from '../Utilities/Loading';

const MoviesGrid = () => {
  const dispatch = useDispatch();
  const { results, page, isLoading } = useSelector((state) => state.movie);
  useDocumentTitle('Popular Movies');

  useEffect(() => {
    dispatch(getMovies(page));
  }, [dispatch, page]);

  if (isLoading) return <Loading />;

  return (
    <section className={styles.grid}>
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

export default memo(MoviesGrid);
