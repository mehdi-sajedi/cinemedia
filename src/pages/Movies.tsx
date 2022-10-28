import { useEffect } from 'react';
import MoviesGrid from '../components/Movies/MoviesGrid';
import MoviesPagination from '../components/Movies/MoviesPagination';
import MoviesFilterMenu from '../components/Movies/FilterMenu/MoviesFilterMenu';
import FilterBtn from '../components/Movies/FilterMenu/FilterBtn';
import Loading from '../components/Utilities/Loading';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getMovies } from '../features/movies/movieSlice';
import styles from './Movies.module.scss';

const Movies = () => {
  const dispatch = useAppDispatch();
  const { page, isLoading } = useAppSelector((state) => state.movie);
  useDocumentTitle('Popular Movies');

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch, page]);

  return (
    <>
      <FilterBtn />
      <>
        <div className={styles.row}>
          <MoviesFilterMenu />
          {isLoading ? <Loading /> : <MoviesGrid />}
        </div>
        <MoviesPagination />
      </>
    </>
  );
};

export default Movies;
