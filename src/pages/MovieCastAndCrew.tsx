import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getSingleMovie } from '../features/movies/movieSlice';
import { useParams } from 'react-router-dom';
import styles from './MovieCastAndCrew.module.scss';
import Loading from '../components/Utilities/Loading';
import Error from '../components/Utilities/Error';
import Banner from '../components/MovieCast/Banner';
import CreditsList from '../components/MovieCast/CreditsList';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const MovieCastAndCrew = () => {
  const dispatch = useAppDispatch();
  const { movie, isLoading, isError } = useAppSelector((state) => state.movie);
  const { id } = useParams();
  useDocumentTitle(`${movie?.title} | Cast`);

  useEffect(() => {
    dispatch(getSingleMovie(Number(id)));
  }, [dispatch, id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className={styles.movieCastAndCrew}>
      <Banner />
      <div className={styles.content}>
        <div className={styles.lists}>
          <CreditsList credits={movie?.credits.cast} kind="Cast" />
          <CreditsList credits={movie?.credits.crew} kind="Crew" />
        </div>
      </div>
    </div>
  );
};

export default MovieCastAndCrew;
