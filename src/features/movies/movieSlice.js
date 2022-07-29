import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { errorHandler } from '../../utilities/utilities';
import movieService from './movieService';
import { initialMovieFilterState } from '../../data/initialMovieFilterState';

const initialState = {
  results: [],
  totalResults: 100,
  page: 1,
  movie: {},
  filterData: initialMovieFilterState,
  sort: 'popularity.desc',
  filterMenuOpen: false,
  isLoading: false,
  isError: false,
};

export const getMovies = createAsyncThunk(
  'movie/getMovies',
  async (_, thunkAPI) => {
    try {
      const { filterData, sort, page } = thunkAPI.getState().movie;
      return await movieService.getMoviesService(page, filterData, sort);
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
      state.page = 1;
    },
    resetFilterData: (state) => {
      state.filterData = initialMovieFilterState;
      state.sort = 'popularity.desc';
      state.page = 1;
    },
    updateSortOption: (state, action) => {
      state.sort = action.payload;
      state.page = 1;
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
  updateSortOption,
} = movieSlice.actions;
export default movieSlice.reducer;
