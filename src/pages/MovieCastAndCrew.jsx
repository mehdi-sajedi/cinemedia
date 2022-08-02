import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleMovie } from '../features/movies/movieSlice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './MovieCastAndCrew.module.scss';
import { BsArrowLeftShort } from 'react-icons/bs';
import Loading from '../components/Utilities/Loading';
import Error from '../components/Utilities/Error';

const MovieCastAndCrew = () => {
  const dispatch = useDispatch();
  const { movie, isLoading, isError } = useSelector((state) => state.movie);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleMovie(id));
  }, [dispatch, id]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className={styles.movieCastAndCrew}>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <img
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt="/"
          />
          <div className={styles.movieInfo}>
            <h2>
              {movie.title} <span> ({movie.release_date?.slice(0, 4)}) </span>
            </h2>
            <Link to={`/movies/${id}`}>
              <BsArrowLeftShort /> Back to main
            </Link>
          </div>
        </header>
      </div>
      <div className={styles.content}>
        <div className={styles.lists}>
          <div className={styles.cast}>
            <h3 className={styles.castHeading}>Cast</h3>
            <ul className={styles.castList}>
              {movie.credits?.cast.map(
                (c) =>
                  c.profile_path && (
                    <li className={styles.person} key={`${c.id}${c.credit_id}`}>
                      <Link to={`/person/${c.id}`}>
                        <img
                          loading="lazy"
                          src={`https://image.tmdb.org/t/p/w132_and_h132_face${c.profile_path}`}
                          alt=""
                        />
                      </Link>
                      <div className={styles.personInfo}>
                        <Link to={`/person/${c.id}`}>
                          <h3>{c.name}</h3>
                        </Link>
                        <p>{c.character}</p>
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>

          <div className={styles.crew}>
            <h3 className={styles.crewHeading}>Crew</h3>
            <ul className={styles.crewList}>
              {movie.credits?.crew.map(
                (c) =>
                  c.profile_path && (
                    <li className={styles.person} key={`${c.id}${c.credit_id}`}>
                      <Link to={`/person/${c.id}`}>
                        <img
                          loading="lazy"
                          src={`https://image.tmdb.org/t/p/w132_and_h132_face${c.profile_path}`}
                          alt=""
                        />
                      </Link>
                      <div className={styles.personInfo}>
                        <Link to={`/person/${c.id}`}>
                          <h3>{c.name}</h3>
                        </Link>
                        <p>{c.department} </p>
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCastAndCrew;
