import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { useLocation, useSearchParams } from 'react-router-dom';
import MediaCard from './MediaCard';
import GridStyles from './Grid.module.scss';
import {
  destructMovieProps,
  destructShowProps,
  setSearchPayload,
} from '../Utilities/helpers';

const Grid = ({ url, route }) => {
  const { appState, dispatch } = useContext(AppContext);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  console.log('GRID.jsx');

  // For /movies and /shows routes
  useEffect(() => {
    const getResults = async () => {
      try {
        const res = await fetch(url);
        // Not using anything from ...rest, but destructuring it for now for completeness/logging
        let { results, total_results, ...rest } = await res.json();
        console.log({ results, total_results, ...rest });

        results = results.map((entry) =>
          route === 'movies'
            ? destructMovieProps(entry)
            : destructShowProps(entry)
        );

        dispatch({
          type: 'SET-RESULTS',
          payload: {
            results,
            total_results,
            route,
          },
        });
      } catch (err) {
        console.log(err);
      }
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
        let { cast: personMedia } = await res.json();
        console.log(personMedia);

        personMedia = personMedia
          .filter((media) => !media.genre_ids.includes(10763))
          .sort((a, b) => b.vote_count - a.vote_count)
          .map((entry) =>
            entry.media_type === 'movie'
              ? destructMovieProps(entry)
              : destructShowProps(entry)
          );

        dispatch({
          type: 'SET-RESULTS',
          payload: {
            results: personMedia,
            searchData: setSearchPayload(searchQuery, true, obj.name, obj.id),
          },
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
          payload: {
            results: tvAndMovieResults,
            searchData: setSearchPayload(searchQuery, false),
          },
        });
      }
    };

    if (location.pathname.includes('search')) {
      getSearchResults();
    }
  }, [dispatch, location.pathname, searchParams]);

  return (
    <section className={GridStyles.grid}>
      {appState.results.length > 0 &&
        appState.results.map((entry) => {
          return (
            entry.poster_path && (
              <MediaCard {...entry} key={`${entry.id}${entry.credit_id}`} />
            )
          );
        })}
    </section>
  );
};

export default React.memo(Grid);
