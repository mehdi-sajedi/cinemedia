import React, { createContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { enableMapSet } from 'immer';
enableMapSet();

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
    navMenuOpen: false,
    filterMenuOpen: false,
    filters: {
      movies: {},
      shows: {},
    },
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
    } else if (action.type === 'TOGGLE-NAV-MENU') {
      draft.navMenuOpen = !draft.navMenuOpen;
    } else if (action.type === 'TOGGLE-FILTER-MENU') {
      draft.filterMenuOpen = !draft.filterMenuOpen;
    } else if (action.type === 'CLOSE-FILTER-MENU') {
      draft.filterMenuOpen = false;
    } else if (action.type === 'APPLY-FILTERS') {
      draft.filters = action.payload.filterState;
      if (action.payload.route.includes('movie')) {
        draft.pagination.currentMoviesPage = 1;
      } else draft.pagination.currentShowsPage = 1;
    }
  };

  const [appState, dispatch] = useImmerReducer(reducer, initialAppState);

  // -------------------------------------------------------- //
  // -------------------------------------------------------- //
  // -------------------------------------------------------- //
  // -------------------------------------------------------- //

  const initialFilterState = {
    movies: {
      runtime: {
        value: [0, 240],
      },
      year: {
        value: [1980, 2022],
        valueFormatted: ['2000-01-01', '2022-12-31'],
      },
      rating: {
        value: [0, 100],
        valueFormatted: [0, 10],
      },
      genres: [],
      watchProviders: [],
    },
    shows: {
      runtime: {
        value: [0, 240],
      },
      year: {
        value: [1980, 2022],
        valueFormatted: ['2000-01-01', '2022-12-31'],
      },
      rating: {
        value: [0, 100],
        valueFormatted: [0, 10],
      },
      genres: [],
      watchProviders: [],
    },
  };

  const filterReducer = (draft, action) => {
    if (action.type === 'SET-RUNTIME') {
      draft[action.payload.route].runtime.value = action.payload.value;
      // draft.runtime.value = action.payload;
    } else if (action.type === 'SET-YEAR') {
      draft[action.payload.route].year.value = action.payload.value;
      // draft.year.value = action.payload;
      const lowerBound = `${action.payload.value[0]}-01-01`;
      const upperBound = `${action.payload.value[1]}-12-31`;
      draft[action.payload.route].year.valueFormatted = [
        lowerBound,
        upperBound,
      ];
    } else if (action.type === 'SET-RATING') {
      draft[action.payload.route].rating.value = action.payload.value;
      draft[action.payload.route].rating.valueFormatted =
        action.payload.value.map((v) => v / 10);
    } else if (action.type === 'TOGGLE-GENRE') {
      if (draft[action.payload.route].genres.includes(action.payload.id)) {
        draft[action.payload.route].genres = draft[
          action.payload.route
        ].genres.filter((id) => id !== action.payload.id);
      } else {
        draft[action.payload.route].genres.push(action.payload.id);
      }
    } else if (action.type === 'TOGGLE-WATCH-PROVIDER') {
      if (
        draft[action.payload.route].watchProviders.includes(action.payload.id)
      ) {
        draft[action.payload.route].watchProviders = draft[
          action.payload.route
        ].watchProviders.filter((id) => id !== action.payload.id);
      } else {
        draft[action.payload.route].watchProviders.push(action.payload.id);
      }
    } else if (action.type === 'RESET') {
      return initialFilterState;
    }
  };

  const [filterState, dispatchFilter] = useImmerReducer(
    filterReducer,
    initialFilterState
  );

  return (
    <React.StrictMode>
      <AppContext.Provider
        value={{ appState, dispatch, filterState, dispatchFilter }}
      >
        {children}
      </AppContext.Provider>
    </React.StrictMode>
  );
};
