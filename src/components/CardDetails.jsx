import React, { useContext, useEffect, useCallback } from 'react';
import { AppContext } from '../context/app-context';
import { useParams } from 'react-router';
import CardDetailsStyles from './CardDetails.module.scss';

const CardDetails = () => {
  const { id } = useParams();
  const { appState, dispatch } = useContext(AppContext);

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

  return <div>{appState.singleResult.overview}</div>;
};

export default CardDetails;
