import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { errorHandler } from '../../utilities/utilities';
import showService from './showService';
import { initialShowFilterState } from '../../data/initialShowFilterState';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { ShowState, ShowFilterData } from './showTypes';

const hideEpisodes: boolean = JSON.parse(
  localStorage.getItem('hideEpisodes') as string
);

const initialState: ShowState = {
  results: [],
  total_pages: 20,
  page: 1,
  filterData: initialShowFilterState,
  sort: 'popularity.desc',
  filterMenuOpen: false,
  isLoading: false,
  isError: false,
  castScroll: 0,
  prevShowId: 0,
  hideEpisodes: hideEpisodes,
};

export const getShows = createAsyncThunk<ShowState, void, { state: RootState }>(
  'show/getShows',
  async (_, thunkAPI) => {
    try {
      const { filterData, sort, page } = thunkAPI.getState().show;
      return await showService.getShowsService(page, filterData, sort);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

export const getSingleShow = createAsyncThunk(
  'show/getSingleShow',
  async (id: number, thunkAPI) => {
    try {
      return await showService.getSingleShowService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

export const showSlice = createSlice({
  name: 'show',
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
    updateFilterData: (state, action: PayloadAction<ShowFilterData>) => {
      state.filterData = action.payload;
      state.page = 1;
    },
    resetFilterData: (state) => {
      state.filterData = initialShowFilterState;
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
    setPrevShowId: (state, action: PayloadAction<number>) => {
      state.prevShowId = action.payload;
    },
    toggleHideEpisodes: (state, action: PayloadAction<boolean>) => {
      state.hideEpisodes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShows.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getShows.fulfilled, (state, action) => {
        state.results = action.payload.results;
        state.total_pages = action.payload.total_pages;
        state.isLoading = false;
      })
      .addCase(getShows.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getSingleShow.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getSingleShow.fulfilled, (state, action) => {
        state.show = action.payload;
        state.isLoading = false;
      })
      .addCase(getSingleShow.rejected, (state) => {
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
  setPrevShowId,
  toggleHideEpisodes,
} = showSlice.actions;
export default showSlice.reducer;
