import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { errorHandler } from '../../utilities/utilities';
import movieService from './movieService';

const initialState = {
  results: [],
  totalResults: 100,
  page: 1,
  movie: {},
  isLoading: false,
  isError: false,
};

export const getMovies = createAsyncThunk(
  'movie/getMovies',
  async (page, thunkAPI) => {
    try {
      return await movieService.getMoviesService(page);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

export const getSingleMovie = createAsyncThunk(
  'movie/getSingleMovie',
  async (id, thunkAPI) => {
    try {
      return await movieService.getSingleMovieService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    reset: () => initialState,
    paginate: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.fulfilled, (state, action) => {
        state.results = action.payload.results;
        state.totalResults = action.payload.total_results;
      })
      .addCase(getSingleMovie.fulfilled, (state, action) => {
        state.movie = action.payload;
      });
  },
});

export const { reset, paginate } = movieSlice.actions;
export default movieSlice.reducer;
