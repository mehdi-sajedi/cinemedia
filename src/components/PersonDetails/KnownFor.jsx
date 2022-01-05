import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { Link } from 'react-router-dom';
import styles from './KnownFor.module.scss';

const posterBase = 'https://image.tmdb.org/t/p/w500';

const KnownFor = () => {
  const { appState } = useContext(AppContext);

  return (
    <div className={styles.knownFor}>
      <h3 className={styles.knownForHeading}>Known for</h3>
      <div className={styles.knownForGrid}>
        {appState.person.combined_credits?.cast.slice(0, 10).map((media) => {
          const route = media.media_type === 'movie' ? 'movies' : 'shows';
          return (
            <div className={styles.knownForMedia}>
              <Link
                to={`../${route}/${media.id}`}
                key={`${media.id}-${media.credit_id}`}
              >
                <img src={`${posterBase}${media.poster_path}`} alt="" />
              </Link>
              <h5 className={styles.name}>
                {media.name ? media.name : media.title}
              </h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KnownFor;
