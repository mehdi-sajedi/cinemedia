import React, { createContext } from 'react';
import { useImmerReducer } from 'use-immer';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialAppState = {
    results: {},
    currentMedia: {},
    person: {},
    search: {
      input: '',
      person: null,
      personFullName: '',
      id: null,
    },
    pagination: {
      currentMoviesPage: 1,
      currentShowsPage: 1,
      mediaPerPage: 20,
      totalMovies: 240,
      totalShows: 240,
    },
  };

  const reducer = (draft, action) => {
    // Actions
    if (action.type === 'SET-RESULTS') {
      draft.results = action.payload.results;
      if (action.payload.route === 'movies') {
        draft.pagination.totalMovies = action.payload.totalResults;
      } else {
        draft.pagination.totalShows = action.payload.totalResults;
      }
    } else if (action.type === 'SET-SINGLE-RESULT') {
      draft.currentMedia = action.payload;
    } else if (action.type === 'SET-PERSON') {
      draft.person = action.payload;
    } else if (action.type === 'SET-SEARCH') {
      draft.search = action.payload;
    } else if (action.type === 'SET-RESULTS-FROM-SEARCH') {
      // draft.results = { ...draft.results, results: action.payload };
      draft.results = action.payload;
    } else if (action.type === 'SET-CURRENT-PAGE') {
      if (action.payload.route.includes('movies')) {
        draft.pagination.currentMoviesPage = action.payload.pageNum;
      } else {
        draft.pagination.currentShowsPage = action.payload.pageNum;
      }
    }
  };

  const [appState, dispatch] = useImmerReducer(reducer, initialAppState);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
