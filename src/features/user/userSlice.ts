import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user') as string);
const lightmode = JSON.parse(localStorage.getItem('lightmode') as string);

interface UserState {
  userEmail: string | null;
  id: string | null;
  lightmode?: boolean;
}

const initialState: UserState = {
  userEmail: user?.userEmail,
  id: user?.id,
  lightmode: lightmode,
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
      state.lightmode = !state.lightmode;
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
