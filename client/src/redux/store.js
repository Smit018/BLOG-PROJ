import { createSlice, configureStore } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadInitialState = () => {
  const storedLogin = localStorage.getItem("isLogin");
  return storedLogin ? JSON.parse(storedLogin) : false;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: loadInitialState(),
  },
  reducers: {
    login(state) {
      state.isLogin = true;
      localStorage.setItem("isLogin", JSON.stringify(true)); // Persist login state
    },
    logout(state) {
      state.isLogin = false;
      localStorage.removeItem("isLogin"); // Remove login state
    },
  },
});
export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
