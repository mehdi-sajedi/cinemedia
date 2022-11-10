import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import personService from './personService';
import { errorHandler } from '../../utilities/utilities';
import { PersonState } from './personTypes';
import { RootState } from '../../store/store';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: PersonState = {
  results: [],
  total_pages: 20,
  page: 1,
  isLoading: false,
  isError: false,
};

export const getPeople = createAsyncThunk<
  PersonState,
  void,
  { state: RootState }
>('person/getPeople', async (_, thunkAPI) => {
  try {
    const { page } = thunkAPI.getState().person;
    return await personService.getPeopleService(page);
  } catch (error) {
    return thunkAPI.rejectWithValue(errorHandler(error));
  }
});

export const getPerson = createAsyncThunk(
  'person/getPerson',
  async (personId: number, thunkAPI) => {
    try {
      return await personService.getPersonService(personId);
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  }
);

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    reset: () => initialState,
    paginate: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPeople.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getPeople.fulfilled, (state, action) => {
      state.results = action.payload.results;
      state.isLoading = false;
    });
    builder.addCase(getPeople.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getPerson.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getPerson.fulfilled, (state, action) => {
      state.person = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getPerson.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { reset, paginate } = personSlice.actions;
export default personSlice.reducer;
