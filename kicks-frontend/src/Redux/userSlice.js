import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currentUser: {
    cart: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    userDetails: (state, action) => {
      state.currentUser = action.payload;
    },
    setCart: (state, action) => {
      state.currentUser.cart = action.payload;
    },
  },
});

export const { setLoggedIn, userDetails, setCart } = userSlice.actions;

export default userSlice.reducer;
