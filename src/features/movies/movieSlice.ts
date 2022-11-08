import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { errorHandler } from '../../utilities/utilities';
import { initialMovieFilterState } from '../../data/initialMovieFilterState';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import movieService from './movieService';
import { MovieState, MovieFilterData } from './movieTypes';

const initialState: MovieState = {
  results: [],
  total_results: 100,
  page: 1,
  filterData: initialMovieFilterState,
  sort: 'popularity.desc',
  filterMenuOpen: false,
  isLoading: false,
  isError: false,
  castScroll: 0,
  prevMovieId: 0,
};

export const getMovies = createAsyncThunk<
  MovieState,
  void,
  { state: RootState }
>('movie/getMovies', async (_, thunkAPI) => {
  try {
    const { page, filterData, sort } = thunkAPI.getState().movie;
    return await movieService.getMoviesService(page, filterData, sort);
  } catch (error) {
    return thunkAPI.rejectWithValue(errorHandler(error));
  }
});

export const getSingleMovie = createAsyncThunk(
  'movie/getSingleMovie',
  async (id: number, thunkAPI) => {
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
    paginate: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    toggleFilterMenu: (state) => {
      state.filterMenuOpen = !state.filterMenuOpen;
    },
    closeFilterMenu: (state) => {
      state.filterMenuOpen = false;
    },
    updateFilterData: (state, action: PayloadAction<MovieFilterData>) => {
      state.filterData = action.payload;
      state.page = 1;
    },
    resetFilterData: (state) => {
      state.filterData = initialMovieFilterState;
      state.sort = 'popularity.desc';
      state.page = 1;
    },
    updateSortOption: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
      state.page = 1;
    },
    updateCastScroll: (state, action: PayloadAction<number>) => {
      state.castScroll = action.payload;
    },
    setPrevMovieId: (state, action: PayloadAction<number>) => {
      state.prevMovieId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload.results;
        state.total_results = action.payload.total_results;
      })
      .addCase(getMovies.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getSingleMovie.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getSingleMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movie = action.payload;
      })
      .addCase(getSingleMovie.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
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
  updateCastScroll,
  setPrevMovieId,
} = movieSlice.actions;
export default movieSlice.reducer;
