import React, { createContext } from 'react';
import { useImmerReducer } from 'use-immer';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialAppState = {
    results: [],
    currentMedia: {},
    person: {},
    search: {
      input: '',
      person: null,
      personFullName: '',
      id: null,
    },
  };

  const reducer = (draft, action) => {
    // Actions
    if (action.type === 'SET-RESULTS') {
      draft.results = action.payload;
    } else if (action.type === 'SET-SINGLE-RESULT') {
      draft.currentMedia = action.payload;
    } else if (action.type === 'SET-PERSON') {
      draft.person = action.payload;
    } else if (action.type === 'SET-SEARCH') {
      draft.search = action.payload;
    }
  };

  const getActorDetails = async (url) => {
    const res = await fetch(url);
    const personInfo = await res.json();
    console.log(personInfo);
    dispatch({ type: 'SET-PERSON', payload: personInfo });
  };

  const [appState, dispatch] = useImmerReducer(reducer, initialAppState);

  return (
    <AppContext.Provider value={{ appState, dispatch, getActorDetails }}>
      {children}
    </AppContext.Provider>
  );
};
