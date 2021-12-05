import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { useLocation, useSearchParams } from 'react-router-dom';
import MediaCard from './MediaCard';
import _ from 'lodash';
import GridStyles from './Grid.module.scss';

const Grid = ({ url, route }) => {
  const { appState, dispatch } = useContext(AppContext);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  // For /movies and /shows routes
  useEffect(() => {
    const getResults = async () => {
      const res = await fetch(url);
      const data = await res.json();
      dispatch({
        type: 'SET-RESULTS',
        payload: {
          results: data.results,
          totalResults: data.total_results,
          route: route,
        },
      });
      console.log(data);
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
        const personWork = await res.json();
        dispatch({
          type: 'SET-RESULTS',
          payload: {
            results: personWork.cast,
          },
        });
        dispatch({
          type: 'SET-SEARCH',
          payload: {
            query: searchQuery,
            person: true,
            personFullName: obj.name,
            id: obj.id,
          },
        });
      };

      const personExactMatch = data.results.find((entry) => {
        return (
          entry.media_type === 'person' &&
          entry.name.toLowerCase() === searchQuery.toLowerCase()
        );
      });

      if (personExactMatch) {
        getPersonMedia(personExactMatch);
      } else if (data.results[0].media_type === 'person') {
        getPersonMedia(data.results[0]);
      } else {
        const tvAndMovieResults = data.results.filter(
          (entry) => entry.media_type !== 'person'
        );
        dispatch({
          type: 'SET-RESULTS',
          payload: { results: tvAndMovieResults },
        });
        dispatch({
          type: 'SET-SEARCH',
          payload: {
            query: searchQuery,
            person: false,
            personFullName: '',
            id: null,
          },
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
