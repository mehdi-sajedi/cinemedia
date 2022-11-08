import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getSingleMovie } from '../features/movies/movieSlice';
import { useParams } from 'react-router';
import styles from './SingleMovie.module.scss';
import MovieShowcase from '../components/SingleMovie/MovieShowcase';
import MovieCast from '../components/SingleMovie/MovieCast';
import MovieSidebar from '../components/SingleMovie/MovieSidebar';
import MovieRecommendations from '../components/SingleMovie/MovieRecommendations';
import Loading from '../components/Utilities/Loading';
import Error from '../components/Utilities/Error';

const SingleMovie = () => {
  const dispatch = useAppDispatch();
  const { movie, isLoading, isError } = useAppSelector((state) => state.movie);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleMovie(Number(id)));
  }, [dispatch, id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <MovieShowcase />
      <section className={styles.movieDetails}>
        <MovieCast />
        <MovieSidebar />
      </section>
      {movie && movie.recommendations?.results?.length > 0 && (
        <MovieRecommendations />
      )}
    </>
  );
};

export default SingleMovie;
