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
    navMenuOpen: false,
    filterMenuOpen: false,
    filters: {
      runtime: {
        value: [0, 99999],
        params: {
          gte: 'with_runtime_gte',
          lte: 'with_runtime_lte',
        },
      },
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
      draft.filters = action.payload;
    }
    // else if (action.type === 'SET-RUNTIME') {
    //   draft.filters.runtime = action.payload;
    // }
  };

  const [appState, dispatch] = useImmerReducer(reducer, initialAppState);

  // -------------------------------------------------------- //
  // -------------------------------------------------------- //
  // -------------------------------------------------------- //
  // -------------------------------------------------------- //

  const initialFilterState = {
    runtime: {
      value: [0, 240],
      params: {
        gte: 'with_runtime_gte',
        lte: 'with_runtime_lte',
      },
    },
    year: {
      value: [1980, 2022],
      params: {
        gte: 'primary_release_date.gte',
        lte: 'primary_release_date.lte',
      },
      valueFormatted: ['2000-01-01', '2022-12-31'],
    },
    rating: {
      value: [0, 100],
      params: {
        gte: 'vote_average.gte',
        lte: 'vote_average.lte',
      },
      valueFormatted: [0, 10],
    },
  };

  const filterReducer = (draft, action) => {
    if (action.type === 'SET-RUNTIME') {
      draft.runtime.value = action.payload;
    } else if (action.type === 'SET-YEAR') {
      draft.year.value = action.payload;
      const lowerBound = `${action.payload[0]}-01-01`;
      const upperBound = `${action.payload[1]}-12-31`;
      draft.year.valueFormatted = [lowerBound, upperBound];
    } else if (action.type === 'SET-RATING') {
      draft.rating.value = action.payload;
      draft.rating.valueFormatted = action.payload.map((v) => v / 10);
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
