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
      const URL_SHOW_SINGLE = `https://api.themoviedb.org/3/tv/${mediaID}?api_key=${process.env.REACT_APP_API_KEY}`;
      const URL_MOVIE_SINGLE = `https://api.themoviedb.org/3/movie/${mediaID}?api_key=${process.env.REACT_APP_API_KEY}`;

      const URL_SHOW_CREDITS = `https://api.themoviedb.org/3/tv/${mediaID}/credits?api_key=${process.env.REACT_APP_API_KEY}`;
      const URL_MOVIE_CREDITS = `https://api.themoviedb.org/3/movie/${mediaID}/credits?api_key=${process.env.REACT_APP_API_KEY}`;

      const media = pathname.includes('movies')
        ? URL_MOVIE_SINGLE
        : URL_SHOW_SINGLE;
      const media2 = pathname.includes('movies')
        ? URL_MOVIE_CREDITS
        : URL_SHOW_CREDITS;
      const res = await fetch(media);
      const res2 = await fetch(media2);

      if (media === URL_MOVIE_SINGLE) {
        const data = await res.json();
        const { cast, crew } = await res2.json();
        dispatch({
          type: 'SET-SINGLE-RESULT',
          payload: { ...data, cast, crew },
        });
      } else if (media === URL_SHOW_SINGLE) {
        const {
          name: title,
          first_air_date: release_date,
          episode_run_time: runtime,
          ...rest
        } = await res.json();
        const { cast, crew } = await res2.json();

        dispatch({
          type: 'SET-SINGLE-RESULT',
          payload: {
            title,
            release_date,
            runtime: runtime[0],
            ...rest,
            cast,
            crew,
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
