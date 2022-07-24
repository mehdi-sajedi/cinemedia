import { useEffect } from 'react';
import MoviesGrid from '../components/Movies/MoviesGrid';
import MoviesPagination from '../components/Movies/MoviesPagination';
import FilterMenu from '../components/Movies/FilterMenu/FilterMenu';
import FilterBtn from '../components/Movies/FilterMenu/FilterBtn';
import Loading from '../components/Utilities/Loading';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../features/movies/movieSlice';
import styles from './Movies.module.scss';

const Movies = () => {
  const dispatch = useDispatch();
  const { page, isLoading } = useSelector((state) => state.movie);
  useDocumentTitle('Popular Movies');

  useEffect(() => {
    dispatch(getMovies(page));
  }, [dispatch, page]);

  return (
    <>
      <FilterBtn />
      <>
        <div className={styles.row}>
          <FilterMenu />
          {isLoading ? <Loading /> : <MoviesGrid />}
        </div>
        <MoviesPagination />
      </>
    </>
  );
};

export default Movies;
