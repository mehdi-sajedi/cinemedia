import React, { createContext } from 'react';
import { useImmerReducer } from 'use-immer';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialAppState = {
    results: [],
    search: '',
    singleResult: {},
  };

  const reducer = (draft, action) => {
    // Actions
    if (action.type === 'SET-RESULTS') {
      draft.results = action.payload;
    } else if (action.type === 'SET-SEARCH-TEXT') {
      draft.search = action.payload;
    } else if (action.type === 'SET-SINGLE-RESULT') {
      draft.singleResult = action.payload;
    }
  };

  const [appState, dispatch] = useImmerReducer(reducer, initialAppState);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
