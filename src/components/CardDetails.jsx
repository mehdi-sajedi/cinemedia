import React, { useContext } from 'react';
import { AppContext } from '../context/app-context';
import styles from './CardDetails.module.scss';
import { BsDot } from 'react-icons/bs';
import { colorPercentage } from './utilities/colorPercentage';
import _ from 'lodash';

const backdropBase = 'https://image.tmdb.org/t/p/w1280/';
const posterBase = 'https://image.tmdb.org/t/p/w780/';
// const backdropBase = 'https://image.tmdb.org/t/p/original/';
// const posterBase = 'https://image.tmdb.org/t/p/original/';

const CardDetails = () => {
  const { appState } = useContext(AppContext);

  const media = appState.singleResult;

  return (
    <main className={styles.main}>
      <div className={styles.showcase}>
        <div
          className={styles.backdrop}
          style={{
            background: `url('${backdropBase}${media.backdrop_path}') no-repeat center center/cover`,
          }}
        ></div>
        <div className={styles.content}>
          <img src={`${posterBase}${media.poster_path}`} alt="" />
          <div className={styles.textContent}>
            <div className={styles.heading}>
              <h1>{media.title}</h1>
              <span>({media.release_date?.slice(0, 4)})</span>
            </div>
            <p className={styles.tagline}>{media.tagline}</p>
            <div className={styles.row}>
              <div
                className={styles.voteCircle}
                style={{
                  border: `3px solid ${colorPercentage(
                    media.vote_average / 10
                  )}`,
                }}
              >
                <p>{media.vote_average?.toFixed(1)}</p>
              </div>
              <BsDot className={styles.dot} />
              <ul className={styles.genres}>
                {media.genres?.map((genre, idx) => {
                  return (
                    <li key={_.uniqueId()}>
                      {genre.name}
                      {idx === media.genres.length - 1 ? null : ','}
                    </li>
                  );
                })}
              </ul>
              <BsDot className={styles.dot} />
              <p className={styles.runtime}>{media.runtime}m</p>
            </div>
            <div className={styles.overview}>
              <h3>Overview</h3>
              <p>{media.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CardDetails;
