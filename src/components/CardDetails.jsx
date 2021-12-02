import React, { useContext, useEffect, useCallback } from 'react';
import { AppContext } from '../context/app-context';
import { useParams } from 'react-router';
import CardDetailsStyles from './CardDetails.module.scss';

const backdropBase = 'https://image.tmdb.org/t/p/w1280/';
const posterBase = 'https://image.tmdb.org/t/p/w780/';
// const backdropBase = 'https://image.tmdb.org/t/p/original/';
// const posterBase = 'https://image.tmdb.org/t/p/original/';

const CardDetails = () => {
  const { id } = useParams();
  const { appState, dispatch } = useContext(AppContext);

  const media = appState.singleResult;

  // const URL_TV = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`;

  // const URL_MOVIE = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;

  // const getSingle = useCallback(
  //   async (endpoint) => {
  //     const res = await fetch(endpoint);
  //     const data = await res.json();
  //     console.log(data);
  //     dispatch({ type: 'SET-SINGLE-RESULT', payload: data });
  //   },
  //   [dispatch]
  // );

  // useEffect(() => {
  //   console.log(appState.singleResult);
  //   if (JSON.stringify(appState.singleResult) === '{}') {
  //     try {
  //       getSingle(URL_MOVIE);
  //     } catch (err) {
  //       getSingle(URL_TV);
  //     }
  //   }
  // }, [appState.singleResult, getSingle, URL_MOVIE, URL_TV]);

  return (
    <main className={CardDetailsStyles.main}>
      <div className={CardDetailsStyles.showcase}>
        <div
          className={CardDetailsStyles.backdrop}
          style={{
            background: `url('${backdropBase}${media.backdrop_path}') no-repeat center center/cover`,
          }}
        ></div>
        <div className={CardDetailsStyles.content}>
          <img src={`${posterBase}${media.poster_path}`} alt="" />
          <div className={CardDetailsStyles.textContent}>
            {media.title && <h1>{media.title}</h1>}
            {media.name && <h1>{media.name}</h1>}
            <p className={CardDetailsStyles.tagline}>{media.tagline}</p>
            <p>{media.overview}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CardDetails;
