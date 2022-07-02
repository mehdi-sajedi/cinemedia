import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movies/movieSlice';
import personReducer from '../features/person/personSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    person: personReducer,
  },
});
