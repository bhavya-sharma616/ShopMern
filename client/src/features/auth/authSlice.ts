import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../../types/auth.types";


const getFromStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: JSON.parse(getFromStorage("user") || "null"),
  token: getFromStorage("token"),
  isAuthenticated: !!getFromStorage("token"),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

try {
    localStorage.setItem("token", action.payload.token);
    localStorage.setItem("user", JSON.stringify(action.payload.user));
  } catch {
    // storage blocked, silently continue
  }    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch {
    // storage blocked, silently continue
  }
    },

    setCredentials: (
      state,
      action
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { loginSuccess, logout, setCredentials } =
  authSlice.actions;

export default authSlice.reducer;