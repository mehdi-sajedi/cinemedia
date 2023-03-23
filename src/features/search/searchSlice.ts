import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import searchService from './searchService';
import { errorHandler } from '../../utilities/utilities';
import { SearchState } from './searchTypes';

const initialState: SearchState = {
  results: [],
  text: '',
  person: null,
  isLoading: false,
  isError: false,
};

export const getSearchResults = createAsyncThunk(
  'search/getSearchResults',
  async (text: string, thunkAPI) => {
    try {
      return await searchService.getSearchResultsService(text);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
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
    builder.addCase(getSearchResults.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getSearchResults.fulfilled, (state, action) => {
      state.results = action.payload.results;
      state.text = action.payload.text;
      state.person = action.payload.person;
      state.isLoading = false;
    });
    builder.addCase(getSearchResults.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { reset } = searchSlice.actions;
export default searchSlice.reducer;
