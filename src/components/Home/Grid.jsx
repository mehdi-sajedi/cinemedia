import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { useLocation, useSearchParams } from 'react-router-dom';
import MediaCard from './MediaCard';
import _ from 'lodash';
import GridStyles from './Grid.module.scss';
import {
  destructMovieProps,
  destructShowProps,
  setSearchPayload,
} from '../Utilities/helpers';

const Grid = ({ url, route }) => {
  const { appState, dispatch } = useContext(AppContext);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  // For /movies and /shows routes
  useEffect(() => {
    const getResults = async () => {
      const res = await fetch(url);
      // Not using anything from ...rest, but destructuring it for now for completeness/logging
      let { results, total_results, ...rest } = await res.json();

      results = results.map((entry) => {
        return route === 'movies'
          ? { name: entry.title, media: route, ...entry }
          : {
              release_date: entry.first_air_date,
              media: route,
              ...entry,
            };
      });

      dispatch({
        type: 'SET-RESULTS',
        payload: {
          results,
          total_results,
          route,
        },
      });
      console.log({ results, total_results, ...rest });
    };

    getResults();
  }, [dispatch, url, route]);

  // For /search route
  useEffect(() => {
    const getSearchResults = async () => {
      const searchQuery = searchParams.get('query');
      if (!searchQuery) return;

      const URL_MULTI = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${searchQuery}`;

      const res = await fetch(URL_MULTI);
      const data = await res.json();
      if (data.results.length === 0) return;

      const getPersonMedia = async (obj) => {
        const URL_PERSON_ID = `https://api.themoviedb.org/3/person/${obj.id}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}`;
        const res = await fetch(URL_PERSON_ID);
        let { cast: personWork } = await res.json();
        console.log(personWork);

        personWork = personWork.map((entry) =>
          entry.media_type === 'movie'
            ? destructMovieProps(entry)
            : destructShowProps(entry)
        );

        dispatch({
          type: 'SET-RESULTS',
          payload: {
            results: personWork,
          },
        });
        dispatch({
          type: 'SET-SEARCH',
          payload: setSearchPayload(searchQuery, true, obj.name, obj.id),
        });
      };

      const personExactMatch = data.results.find(
        (entry) =>
          entry.media_type === 'person' &&
          entry.name.toLowerCase() === searchQuery.toLowerCase()
      );

      // Input has exact name match ("Kevin Hart")
      if (personExactMatch) getPersonMedia(personExactMatch);
      // Input has partial name ("Denzel") where top result is a person
      else if (data.results[0].media_type === 'person')
        getPersonMedia(data.results[0]);
      // No exact name match AND top result is not a person
      else {
        const tvAndMovieResults = data.results
          .filter((entry) => entry.media_type !== 'person')
          .map((entry) =>
            entry.media_type === 'movie'
              ? destructMovieProps(entry)
              : destructShowProps(entry)
          );

        dispatch({
          type: 'SET-RESULTS',
          payload: { results: tvAndMovieResults },
        });
        dispatch({
          type: 'SET-SEARCH',
          payload: setSearchPayload(searchQuery, false),
        });
      }
    };

    if (pathname.includes('search')) {
      getSearchResults();
    }
  }, [dispatch, pathname, searchParams]);

  return (
    <section className={GridStyles.grid}>
      {appState.results.length > 0 &&
        appState.results.map((entry) => {
          return (
            entry.poster_path && <MediaCard {...entry} key={_.uniqueId()} />
          );
        })}
    </section>
  );
};

export default Grid;
