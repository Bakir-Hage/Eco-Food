import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  isLoggedIn: boolean;
}

const initialState: UserState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
      localStorage.setItem("isLoggedIn", state.isLoggedIn.toString());
    },
  },
});

// Action creators are generated for each case reducer function
export const { LOGIN } = userSlice.actions;

export default userSlice.reducer;
