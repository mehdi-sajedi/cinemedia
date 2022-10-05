import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user')) || null;
const darkmode = JSON.parse(localStorage.getItem('darkmode'));

const initialState = {
  userEmail: user?.userEmail,
  id: user?.id,
  darkmode: darkmode,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.userEmail = action.payload.userEmail;
      state.id = action.payload.id;
    },
    logoutUser: (state) => {
      state.userEmail = null;
      state.id = null;
    },
    toggleTheme: (state) => {
      state.darkmode = !state.darkmode;
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
