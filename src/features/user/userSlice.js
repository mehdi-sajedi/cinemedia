import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user')) || null;

const initialState = {
  userEmail: user?.userEmail,
  id: user?.id,
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
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
