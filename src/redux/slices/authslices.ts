import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    nickname: string;
    createdAt?: string; // 가입일 (선택적)
    address?: string;   // 주소 (선택적)
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    setUser: (state, action: PayloadAction<{ email: string; nickname: string }>) => {
      console.log(action.payload);
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;  
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
