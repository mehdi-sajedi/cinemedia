import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { errorHandler } from '../../utilities/utilities';
import showService from './showService';

const initialState = {
  results: [],
  totalResults: 100,
  page: 1,
  show: {},
  isLoading: false,
  isError: false,
};

export const getShows = createAsyncThunk(
  'show/getShows',
  async (page, thunkAPI) => {
    try {
      return await showService.getShowsService(page);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShows.fulfilled, (state, action) => {
        state.results = action.payload.results;
        state.totalResults = action.payload.total_results;
      })
      .addCase(getSingleShow.fulfilled, (state, action) => {
        state.show = action.payload;
      });
  },
});

export const { reset, paginate } = showSlice.actions;
export default showSlice.reducer;
