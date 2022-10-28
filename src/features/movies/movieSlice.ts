import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { errorHandler } from '../../utilities/utilities';
import { initialMovieFilterState } from '../../data/initialMovieFilterState';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import movieService from './movieService';

export interface IGenre {
  value: number;
  label: string;
}

export interface IFilterData {
  year: number[];
  runtime: number[];
  rating: number[];
  services: number[];
  genres: IGenre[];
}

interface SingleMovie {
  title: string;
  release_date: string;
  id: number;
  poster_path: string;
  adult: boolean;
  overview: string;
  vote_count: number;
  popularity: number;
  vote_average: number;
  runtime: number;
  tagline: string;
  backdrop_path: string;
  images: {
    backdrops: {}[];
  };
  genres: {
    id: number;
    name: string;
  }[];
  videos: {
    results: {
      type: string;
      site: string;
    }[];
  };
  recommendations: {
    results: {}[];
  };
}

interface MovieState {
  results: [];
  total_results: number;
  page: number;
  movie?: SingleMovie;
  filterData: IFilterData;
  sort: string;
  filterMenuOpen: boolean;
  isLoading: boolean;
  isError: boolean;
  castScroll: number;
  prevMovieId: number;
}

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
    updateFilterData: (state, action: PayloadAction<IFilterData>) => {
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
        state.results = action.payload.results;
        state.total_results = action.payload.total_results;
        state.isLoading = false;
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
        state.movie = action.payload;
        state.isLoading = false;
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
