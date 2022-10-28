import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user') as string);
const darkmode = JSON.parse(localStorage.getItem('darkmode') as string);

interface UserState {
  userEmail: string | null;
  id: string | null;
  darkmode?: boolean | null;
}

const initialState: UserState = {
  userEmail: user?.userEmail,
  id: user?.id,
  darkmode: darkmode,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserState>) => {
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
