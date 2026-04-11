import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./userThunk";

type UserStateType = {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  uid: string | null;
  email: string | null;
  userName: string | null;
  phoneNumber: string | null;
};

const initialState: UserStateType = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  loading: false,
  error: null,
  uid: localStorage.getItem("uid") || null,
  email: localStorage.getItem("email") || null,
  userName: localStorage.getItem("userName") || null,
  phoneNumber: localStorage.getItem("phoneNumber") || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.uid = null;
      state.email = null;
      state.userName = null;
      state.phoneNumber = null;
      state.error = null;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("uid");
      localStorage.removeItem("email");
      localStorage.removeItem("userName");
      localStorage.removeItem("phoneNumber");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.uid = action.payload.uid as string;
        state.email = action.payload.email as string;
        state.userName = action.payload.userName as string | null;
        state.phoneNumber = action.payload.phoneNumber as string | null;
        state.error = null;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("uid", action.payload.uid as string);
        localStorage.setItem("email", action.payload.email as string);
        localStorage.setItem("userName", action.payload.userName || "");
        localStorage.setItem("phoneNumber", action.payload.phoneNumber || "");
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.uid = action.payload.uid as string;
        state.email = action.payload.email as string;
        state.userName = action.payload.userName as string | null;
        state.phoneNumber = action.payload.phoneNumber as string | null;
        state.error = null;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("uid", action.payload.uid as string);
        localStorage.setItem("email", action.payload.email as string);
        localStorage.setItem("userName", action.payload.userName || "");
        localStorage.setItem("phoneNumber", action.payload.phoneNumber || "");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
