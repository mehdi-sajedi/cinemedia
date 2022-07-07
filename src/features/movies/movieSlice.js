import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { errorHandler } from '../../utilities/utilities';
import movieService from './movieService';
import { initialFilterState } from '../../data/initialFilterState';

const initialState = {
  results: [],
  totalResults: 100,
  page: 1,
  movie: {},
  filterData: initialFilterState,
  filterMenuOpen: false,
  isLoading: false,
  isError: false,
};

export const getMovies = createAsyncThunk(
  'movie/getMovies',
  async (page, thunkAPI) => {
    const filterData = thunkAPI.getState().movie.filterData;
    try {
      return await movieService.getMoviesService(page, filterData);
    } catch (error) {
      return await thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

export const getSingleMovie = createAsyncThunk(
  'movie/getSingleMovie',
  async (id, thunkAPI) => {
    try {
      return await movieService.getSingleMovieService(id);
    } catch (error) {
      return await thunkAPI.rejectWithValue(errorHandler(error));
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
    toggleFilterMenu: (state) => {
      state.filterMenuOpen = !state.filterMenuOpen;
    },
    closeFilterMenu: (state) => {
      state.filterMenuOpen = false;
    },
    updateFilterData: (state, action) => {
      state.filterData = action.payload;
    },
    resetFilterData: (state) => {
      state.filterData = initialFilterState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.results = action.payload.results;
        state.totalResults = action.payload.total_results;
        state.isLoading = false;
      })
      .addCase(getSingleMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleMovie.fulfilled, (state, action) => {
        state.movie = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  reset,
  paginate,
  toggleFilterMenu,
  closeFilterMenu,
  updateFilterData,
  resetFilterData,
} = movieSlice.actions;
export default movieSlice.reducer;
