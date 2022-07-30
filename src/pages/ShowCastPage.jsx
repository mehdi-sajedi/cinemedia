import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleShow } from '../features/shows/showSlice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './ShowCastPage.module.scss';
import { BsArrowLeftShort } from 'react-icons/bs';

const ShowCastPage = () => {
  const dispatch = useDispatch();
  const { show } = useSelector((state) => state.show);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleShow(id));
  }, [dispatch, id]);

  return (
    <div className={styles.showCastPage}>
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
      <ul className={styles.cast}>
        {show.aggregate_credits?.cast.map((c) => (
          <li className={styles.person} key={`${c.id}${c.popularity}`}>
            <img
              loading="lazy"
              src={`https://image.tmdb.org/t/p/w132_and_h132_face${c.profile_path}`}
              alt=""
            />
            <div className={styles.personInfo}>
              <h3>{c.name}</h3>
              <p>
                {c.roles[0].character} ({c.total_episode_count} episodes)
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowCastPage;
