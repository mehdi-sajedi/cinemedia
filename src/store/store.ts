import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movies/movieSlice';
import showReducer from '../features/shows/showSlice';
import personReducer from '../features/person/personSlice';
import searchReducer from '../features/search/searchSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    show: showReducer,
    person: personReducer,
    search: searchReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {movie: MoviesState, shows: ShowsState, users: UsersState, ...}
export type AppDispatch = typeof store.dispatch;
