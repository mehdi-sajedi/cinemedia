import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleMovie } from '../features/movies/movieSlice';
import { useLocation } from 'react-router';
import styles from './SingleMovie.module.scss';
import MovieShowcase from '../components/SingleMovie/MovieShowcase';
import MovieCast from '../components/SingleMovie/MovieCast';
import MovieSidebar from '../components/SingleMovie/MovieSidebar';
import MovieRecommendations from '../components/SingleMovie/MovieRecommendations';
import Loading from '../components/Utilities/Loading';
import Error from '../components/Utilities/Error';

const SingleMovie = () => {
  const dispatch = useDispatch();
  const { movie, isLoading, isError } = useSelector((state) => state.movie);
  const { pathname } = useLocation();

  const mediaId = pathname.substring(pathname.lastIndexOf('/') + 1);

  useEffect(() => {
    dispatch(getSingleMovie(mediaId));
  }, [dispatch, mediaId]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <MovieShowcase />
      <section className={styles.movieDetails}>
        <MovieCast />
        <MovieSidebar />
      </section>
      {movie.recommendations?.results.length > 0 && <MovieRecommendations />}
    </>
  );
};

export default SingleMovie;
