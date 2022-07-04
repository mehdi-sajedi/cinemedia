import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movies/movieSlice';
import showReducer from '../features/shows/showSlice';
import personReducer from '../features/person/personSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    show: showReducer,
    person: personReducer,
    search: searchReducer,
  },
});
