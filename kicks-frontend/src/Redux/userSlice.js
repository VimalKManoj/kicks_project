import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: (state,action) => {
      state.isLoggedIn = action.payload;
    },
    userDetails: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setLoggedIn, userDetails } = userSlice.actions;

export default userSlice.reducer;
