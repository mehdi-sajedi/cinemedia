import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/app-context';
import styles from './Showcase.module.scss';
import { useLocation } from 'react-router';
import { BsDot } from 'react-icons/bs';
import { colorPercentage } from '../Utilities/colorPercentage';
import _ from 'lodash';

const backdropBase = 'https://image.tmdb.org/t/p/w1280/';
const posterBase = 'https://image.tmdb.org/t/p/w780/';
// const backdropBase = 'https://image.tmdb.org/t/p/original/';
// const posterBase = 'https://image.tmdb.org/t/p/original/';

const Showcase = () => {
  const { appState, dispatch } = useContext(AppContext);
  const media = appState.currentMedia;
  const { pathname } = useLocation();

  const mediaID = pathname.substring(pathname.lastIndexOf('/') + 1);

  const toHours = () => {
    const hours = Math.floor(media.runtime / 60);
    const remainder = media.runtime - hours * 60;

    if (hours === 0) {
      return `${remainder}m`;
    } else if (remainder === 0) {
      return `${media.runtime}m`;
    } else {
      return `${hours}h ${remainder}m`;
    }
  };

  useEffect(() => {
    const getMediaDetails = async () => {
      const URL_SHOW = `https://api.themoviedb.org/3/tv/${mediaID}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=credits`;
      const URL_MOVIE = `https://api.themoviedb.org/3/movie/${mediaID}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=credits`;

      const media = pathname.includes('movies') ? URL_MOVIE : URL_SHOW;

      const res = await fetch(media);

      if (media === URL_MOVIE) {
        const data = await res.json();
        dispatch({
          type: 'SET-SINGLE-RESULT',
          payload: data,
        });
      } else if (media === URL_SHOW) {
        const {
          name: title,
          first_air_date: release_date,
          episode_run_time: runtime,
          ...rest
        } = await res.json();

        dispatch({
          type: 'SET-SINGLE-RESULT',
          payload: {
            title,
            release_date,
            runtime: runtime[0],
            ...rest,
          },
        });
      }
    };
    getMediaDetails();
  }, [dispatch, mediaID, pathname]);

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
              <p className={styles.runtime}>{toHours()}</p>
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

export default Showcase;
