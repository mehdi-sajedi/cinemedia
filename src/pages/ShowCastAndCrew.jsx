import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleShow } from '../features/shows/showSlice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './ShowCastAndCrew.module.scss';
import { BsArrowLeftShort } from 'react-icons/bs';
import ToggleBtn from '../components/ShowCast/ToggleBtn';

const ShowCastAndCrew = () => {
  const dispatch = useDispatch();
  const { show, hideEpisodes } = useSelector((state) => state.show);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleShow(id));
  }, [dispatch, id]);

  return (
    <div className={styles.showCastAndCrew}>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <img
            src={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
            alt="/"
          />
          <div className={styles.showInfo}>
            <h2>
              {show.name} <span> ({show.first_air_date?.slice(0, 4)}) </span>
            </h2>
            <Link to={`/shows/${id}`}>
              <BsArrowLeftShort /> Back to main
            </Link>
          </div>
        </header>
      </div>
      <div className={styles.content}>
        <ToggleBtn />
        <div className={styles.lists}>
          <div className={styles.cast}>
            <h3 className={styles.castHeading}>Cast</h3>
            <ul className={styles.castList}>
              {show.aggregate_credits?.cast.map(
                (c) =>
                  c.profile_path && (
                    <li
                      className={styles.person}
                      key={`${c.id}${c.popularity}`}
                    >
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
                        <p>
                          {c.roles[0].character}{' '}
                          <span className={hideEpisodes ? styles.hide : ''}>
                            ({c.total_episode_count} episodes)
                          </span>
                        </p>
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>

          <div className={styles.crew}>
            <h3 className={styles.crewHeading}>Crew</h3>
            <ul className={styles.crewList}>
              {show.aggregate_credits?.crew.map(
                (c) =>
                  c.profile_path && (
                    <li
                      className={styles.person}
                      key={`${c.id}${c.popularity}`}
                    >
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
                        <p>
                          {c.department}{' '}
                          <span className={hideEpisodes ? styles.hide : ''}>
                            ({c.total_episode_count} episodes)
                          </span>
                        </p>
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

export default ShowCastAndCrew;
