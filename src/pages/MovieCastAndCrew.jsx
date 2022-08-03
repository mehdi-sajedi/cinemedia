import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleMovie } from '../features/movies/movieSlice';
import { useParams } from 'react-router-dom';
import styles from './MovieCastAndCrew.module.scss';
import Loading from '../components/Utilities/Loading';
import Error from '../components/Utilities/Error';
import Banner from '../components/MovieCast/Banner';
import CreditsList from '../components/MovieCast/CreditsList';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const MovieCastAndCrew = () => {
  const dispatch = useDispatch();
  const { movie, isLoading, isError } = useSelector((state) => state.movie);
  const { id } = useParams();
  useDocumentTitle(`${movie.title} | Cast`);

  useEffect(() => {
    dispatch(getSingleMovie(id));
  }, [dispatch, id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className={styles.movieCastAndCrew}>
      <Banner />
      <div className={styles.content}>
        <div className={styles.lists}>
          <CreditsList creditType="cast" />
          <CreditsList creditType="crew" />
        </div>
      </div>
    </div>
  );
};

export default MovieCastAndCrew;
