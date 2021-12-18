import React, { createContext } from 'react';
import { useImmerReducer } from 'use-immer';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialAppState = {
    results: {},
    currentMedia: {},
    person: {},
    search: {
      query: '',
      person: null,
      personFullName: '',
      id: null,
    },
    pagination: {
      currentMoviesPage: 1,
      currentShowsPage: 1,
      mediaPerPage: 20,
      totalMovies: 200,
      totalShows: 200,
    },
    currentSearchText: '',
  };

  const reducer = (draft, action) => {
    // Actions
    if (action.type === 'SET-RESULTS') {
      draft.results = action.payload.results;
      draft.search = action.payload.searchData;
      if (action.payload.route === 'movies') {
        draft.pagination.totalMovies = action.payload.total_results;
      } else if (action.payload.route === 'shows') {
        draft.pagination.totalShows = action.payload.total_results;
      } else {
        // from search
      }
    } else if (action.type === 'SET-SINGLE-RESULT') {
      draft.currentMedia = action.payload;
    } else if (action.type === 'SET-PERSON') {
      draft.person = action.payload;
    } else if (action.type === 'SET-CURRENT-PAGE') {
      if (action.payload.route.includes('movies')) {
        draft.pagination.currentMoviesPage = action.payload.pageNum;
      } else {
        draft.pagination.currentShowsPage = action.payload.pageNum;
      }
    } else if (action.type === 'SET-CURRENT-SEARCH-TEXT') {
      draft.currentSearchText = action.payload;
    }
  };

  const [appState, dispatch] = useImmerReducer(reducer, initialAppState);

  return (
    <React.StrictMode>
      <AppContext.Provider value={{ appState, dispatch }}>
        {children}
      </AppContext.Provider>
    </React.StrictMode>
  );
};
