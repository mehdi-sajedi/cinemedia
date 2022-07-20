import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { errorHandler } from '../../utilities/utilities';
import showService from './showService';
import { initialShowFilterState } from '../../data/initialShowFilterState';

const initialState = {
  results: [],
  totalResults: 100,
  page: 1,
  show: {},
  filterData: initialShowFilterState,
  sort: 'popularity.desc',
  filterMenuOpen: false,
  isLoading: false,
  isError: false,
};

export const getShows = createAsyncThunk(
  'show/getShows',
  async (page, thunkAPI) => {
    try {
      const filterData = thunkAPI.getState().show.filterData;
      const sort = thunkAPI.getState().show.sort;
      return await showService.getShowsService(page, filterData, sort);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

export const getSingleShow = createAsyncThunk(
  'show/getSingleShow',
  async (id, thunkAPI) => {
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
      state.filterData = initialShowFilterState;
      state.page = 1;
    },
    updateSortOption: (state, action) => {
      state.sort = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShows.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShows.fulfilled, (state, action) => {
        state.results = action.payload.results;
        state.totalResults = action.payload.total_results;
        state.isLoading = false;
      })
      .addCase(getSingleShow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleShow.fulfilled, (state, action) => {
        state.show = action.payload;
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
} = showSlice.actions;
export default showSlice.reducer;
