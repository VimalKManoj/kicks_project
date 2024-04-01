import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    userDetails: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setLoggedIn, userDetails } = userSlice.actions;

export default userSlice.reducer;
