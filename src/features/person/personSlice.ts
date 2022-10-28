import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import personService from './personService';
import { errorHandler } from '../../utilities/utilities';

interface PersonState {
  person: {
    name: string;
  };
  isLoading: boolean;
  isError: boolean;
}

const initialState: PersonState = {
  person: {
    name: '',
  },
  isLoading: false,
  isError: false,
};

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
  },
  extraReducers: (builder) => {
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

export const { reset } = personSlice.actions;
export default personSlice.reducer;
