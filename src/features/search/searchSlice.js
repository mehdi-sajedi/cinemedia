import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import searchService from './searchService';
import { errorHandler } from '../../utilities/utilities';

const initialState = {
  results: [],
};

export const getSearchResults = createAsyncThunk(
  'search/getSearchResults',
  async (text, thunkAPI) => {
    try {
      return await searchService.getSearchResultsService(text);
    } catch (error) {
      return await thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResults.fulfilled, (state, action) => {
      state.results = action.payload;
    });
  },
});

export const { reset } = searchSlice.actions;
export default searchSlice.reducer;
